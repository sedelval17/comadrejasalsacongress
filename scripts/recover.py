#!/usr/bin/env python3
"""Archive publicly linked Comadreja content, assets and metadata reproducibly.

Requires requests, beautifulsoup4 and Pillow. No original code is used by the app.
"""
from __future__ import annotations

import concurrent.futures
import hashlib
import io
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://comadrejaproducciones.com/'
PAGES = ['index.html', 'el-mundial.html', 'battle-master.html', 'talleres.html', 'artistas.html', 'precios.html', 'contacto.html']
RESEARCH = ROOT / 'research'
ASSETS = ROOT / 'public/assets/original'
DOCS = ROOT / 'public/documents'
for directory in (RESEARCH / 'pages', RESEARCH / 'source', ASSETS, DOCS):
    directory.mkdir(parents=True, exist_ok=True)


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def fetch(url, max_bytes=40_000_000):
    try:
        response = requests.get(url, timeout=35, stream=True)
        info = {'url': url, 'finalUrl': response.url, 'status': response.status_code,
                'contentType': response.headers.get('Content-Type', ''),
                'advertisedBytes': int(response.headers.get('Content-Length', '0') or '0')}
        if info['advertisedBytes'] > max_bytes:
            response.close()
            return info | {'skipped': 'File exceeds 40 MB recovery limit'}, None
        data = bytearray()
        for chunk in response.iter_content(65536):
            data.extend(chunk)
            if len(data) > max_bytes:
                response.close()
                return info | {'skipped': 'File exceeds 40 MB recovery limit'}, None
        info['bytes'] = len(data)
        return info, bytes(data)
    except Exception as exc:
        return {'url': url, 'error': str(exc)}, None


def internal(url):
    return urlparse(url).hostname in {'comadrejaproducciones.com', 'www.comadrejaproducciones.com'}


def normalized(raw, base):
    if not raw or raw.startswith(('data:', 'mailto:', 'tel:', 'javascript:', '#')):
        return None
    return urljoin(base, raw).split('#')[0]


def safe_name(url):
    parts = [unquote(x) for x in urlparse(url).path.split('/') if x]
    if parts[:2] == ['assets', 'img']:
        parts = parts[2:]
    return re.sub(r'[^a-zA-Z0-9._-]+', '-', '-'.join(parts)) or 'index'


http = []
pages = []
asset_urls = set()
links = {}
queue = [BASE] + [urljoin(BASE, p) for p in PAGES]
seen_pages = set()
while queue:
    current = [url for url in dict.fromkeys(queue) if url not in seen_pages]
    queue = []
    seen_pages.update(current)
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        responses = list(pool.map(fetch, current))
    for url, (info, data) in zip(current, responses):
        seen_pages.add(url)
        http.append(info)
        if info.get('status') != 200 or data is None:
            continue
        soup = BeautifulSoup(data, 'html.parser')
        slug = Path(urlparse(url).path).stem or 'home'
        (RESEARCH / 'pages' / f'{slug}.html').write_bytes(data)
        text = soup.get_text('\n', strip=True)
        (RESEARCH / 'pages' / f'{slug}.txt').write_text(text + '\n', encoding='utf-8')
        main_sections = []
        for section in soup.select('section'):
            main_sections.append({'headings': [h.get_text(' ', strip=True) for h in section.select('h1,h2,h3,h4')],
                                  'text': section.get_text('\n', strip=True),
                                  'paragraphs': [p.get_text(' ', strip=True) for p in section.select('p')],
                                  'lists': [[li.get_text(' ', strip=True) for li in ul.find_all('li', recursive=False)] for ul in section.select('ul,ol')],
                                  'tables': [[[cell.get_text(' ', strip=True) for cell in row.select('th,td')] for row in table.select('tr')] for table in section.select('table')]})
        images = [{'src': normalized(img.get('src'), url), 'alt': img.get('alt', ''), 'width': img.get('width'), 'height': img.get('height')} for img in soup.select('img')]
        page_links = [{'text': a.get_text(' ', strip=True), 'url': normalized(a.get('href'), url), 'href': a.get('href')} for a in soup.select('a[href]')]
        page = {'url': url, 'slug': slug, 'title': soup.title.get_text() if soup.title else '',
                'description': (soup.find('meta', attrs={'name': 'description'}) or {}).get('content', ''),
                'sections': main_sections, 'images': images, 'links': page_links,
                'iframes': [dict(x.attrs) for x in soup.select('iframe')],
                'videos': [str(x) for x in soup.select('video')], 'text': text}
        pages.append(page)
        for element in soup.select('[src],[href],[poster],[style]'):
            candidates = [element.get(k) for k in ['src', 'href', 'poster']]
            candidates += re.findall(r'url\([\'\"]?([^\'\")]+)', element.get('style', ''))
            for raw in candidates:
                target = normalized(raw, url)
                if not target:
                    continue
                links.setdefault(target, []).append(url)
                if urlparse(target).hostname == 'img.youtube.com':
                    asset_urls.add(target)
                if not internal(target):
                    continue
                suffix = Path(urlparse(target).path).suffix.lower()
                if suffix in {'.html', '.htm'} or target == BASE:
                    if target not in seen_pages:
                        queue.append(target)
                else:
                    asset_urls.add(target)
        print(f'Page {slug}: {len(text)} chars; {len(images)} images', flush=True)

write_json(RESEARCH / 'pages.json', pages)
for filename in ['robots.txt', 'sitemap.xml']:
    info, data = fetch(urljoin(BASE, filename))
    http.append(info)
    if data is not None:
        (RESEARCH / 'source' / filename).write_bytes(data)

# Original CSS/JS are archived only for discovery and audit.
source_urls = [url for url in asset_urls if Path(urlparse(url).path).suffix.lower() in {'.css', '.js'}]
for url in source_urls:
    info, data = fetch(url)
    http.append(info)
    if data is None or info.get('status') != 200:
        continue
    (RESEARCH / 'source' / safe_name(url)).write_bytes(data)
    for raw in re.findall(r'url\([\'\"]?([^\'\")]+)', data.decode('utf-8', 'replace')):
        target = normalized(raw, url)
        if target and internal(target):
            asset_urls.add(target)
            links.setdefault(target, []).append(url)

assets = []
mapping = {}
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
    pending = {pool.submit(fetch, url): url for url in sorted(asset_urls - set(source_urls))}
    for future in concurrent.futures.as_completed(pending):
        url = pending[future]
        info, data = future.result()
        http.append(info)
        item = info | {'sources': sorted(set(links.get(url, [])))}
        if data is not None and info.get('status') == 200:
            suffix = Path(urlparse(url).path).suffix.lower()
            destination = (DOCS if suffix == '.pdf' else ASSETS) / safe_name(url)
            destination.write_bytes(data)
            item['file'] = str(destination.relative_to(ROOT))
            item['localUrl'] = '/' + str(destination.relative_to(ROOT / 'public'))
            item['sha256'] = hashlib.sha256(data).hexdigest()
            mapping[url] = item['localUrl']
            if suffix in {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'}:
                try:
                    with Image.open(io.BytesIO(data)) as img:
                        item.update({'width': img.width, 'height': img.height, 'aspectRatio': round(img.width / img.height, 4),
                                     'format': img.format, 'mode': img.mode,
                                     'quality': 'small-source' if min(img.size) < 300 else 'usable-card' if max(img.size) < 900 else 'large-source',
                                     'recommendedMaxCssWidthAt2x': img.width // 2})
                except Exception as exc:
                    item['imageError'] = str(exc)
            if suffix == '.pdf':
                item['validPdfHeader'] = data.startswith(b'%PDF-')
            if suffix in {'.mp4', '.webm'}:
                item['validVideoHeader'] = b'ftyp' in data[:32] if suffix == '.mp4' else data.startswith(bytes.fromhex('1a45dfa3'))
        assets.append(item)
        print(f"Asset {url}: {info.get('status', info.get('error'))}, {info.get('bytes', 0)} bytes", flush=True)
assets.sort(key=lambda item: item['url'])
write_json(RESEARCH / 'assets.json', assets)
write_json(RESEARCH / 'asset-map.json', mapping)
write_json(RESEARCH / 'http.json', http)
write_json(RESEARCH / 'links.json', [{'url': url, 'internal': internal(url), 'sources': sorted(set(sources))} for url, sources in sorted(links.items())])

artists_page = next(p for p in pages if p['slug'] == 'artistas')
artists_soup = BeautifulSoup((RESEARCH / 'pages/artistas.html').read_text(), 'html.parser')
artists = []
for section in artists_soup.select('section'):
    heading = section.find('h2')
    category = heading.get_text(' ', strip=True) if heading else ''
    for card in section.select('.artist, .grid-2 > div'):
        img = card.find('img')
        h = card.find(['h3', 'h4'])
        source = normalized(img.get('src'), artists_page['url']) if img else None
        paragraphs = [p.get_text(' ', strip=True) for p in card.select('p')]
        artists.append({'name': h.get_text(' ', strip=True) if h else '', 'category': category,
                        'origin': paragraphs[0] if paragraphs else '',
                        'bio': paragraphs[1] if len(paragraphs) > 1 else '',
                        'description': card.get_text(' ', strip=True), 'imageSource': source,
                        'image': mapping.get(source), 'imageAlt': img.get('alt', '') if img else '',
                        'source': artists_page['url']})
    if category == 'Conducción':
        img = section.find('img')
        source = normalized(img.get('src'), artists_page['url'])
        for name in ['Ariel Cechel', 'Gaby Zamora', 'Seba La Vega', 'Maxi Vergara']:
            artists.append({'name': name, 'category': category, 'origin': '', 'bio': '',
                            'description': section.select_one('.lede').get_text(' ', strip=True),
                            'imageSource': source, 'image': mapping.get(source), 'imageIsGroup': True,
                            'imageAlt': img.get('alt', ''), 'source': artists_page['url']})
    if category == 'DJs y música en vivo':
        img = section.find('img')
        source = normalized(img.get('src'), artists_page['url'])
        for h in section.select('h3'):
            name, origin = h.get_text(' ', strip=True).split(' · ', 1)
            artists.append({'name': name, 'category': category, 'origin': origin, 'bio': '',
                            'description': h.get_text(' ', strip=True), 'imageSource': source,
                            'image': mapping.get(source), 'imageIsGroup': True,
                            'imageAlt': img.get('alt', ''), 'source': artists_page['url']})
write_json(RESEARCH / 'artists.json', artists)
write_json(RESEARCH / 'recovery.json', {'recoveredAt': datetime.now(timezone.utc).isoformat(), 'pages': len(pages), 'assets': len(assets), 'artists': len(artists)})
print(f'Complete: {len(pages)} pages, {len(assets)} resources, {len(artists)} artists', flush=True)
