import { launchBrowser } from './browser.mjs';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.TEST_BASE_URL || 'http://localhost:4321';
const widths = [320, 375, 768, 1024, 1440, 1920];
const routes = ['/', '/el-mundial.html', '/battle-master.html', '/talleres.html', '/artistas.html', '/precios.html', '/contacto.html'];
const browser = await launchBrowser();
const results = [];
const failures = [];
const localLinks = new Set();
const externalLinks = new Set();
const accessibility = [];
const interactions = [];
await mkdir('validation/screenshots', { recursive: true });
const check = (condition, description) => { if (!condition) failures.push(description); };

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__qa = { cls: 0, lcp: 0 };
      new PerformanceObserver(list => list.getEntries().forEach(entry => { if (!entry.hadRecentInput) window.__qa.cls += entry.value; })).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { window.__qa.lcp = list.getEntries().at(-1)?.startTime || 0; }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    for (const route of routes) {
      const pageErrors = [];
      const localErrors = [];
      const externalErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) (response.url().startsWith(base) ? localErrors : externalErrors).push(`${response.status()} ${response.url()}`); });
      page.on('requestfailed', request => { (request.url().startsWith(base) ? localErrors : externalErrors).push(`${request.failure()?.errorText} ${request.url()}`); });
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const initialMetrics = await page.evaluate(() => ({ ...window.__qa }));
      await page.evaluate(async () => {
        const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await pause(50); }
        await Promise.race([
          Promise.all(Array.from(document.images).filter(img => img.getBoundingClientRect().width > 0 && !img.closest('details:not([open])')).map(img => img.decode().catch(() => {}))),
          pause(10000),
        ]);
        window.scrollTo(0, 0);
      });
      const inspection = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        overflowing: Array.from(document.querySelectorAll('body *')).filter(element => {
          const r = element.getBoundingClientRect();
          return r.width > 0 && !element.closest('details:not([open])') && (r.right > innerWidth + 1 || r.left < -1) && !element.classList.contains('skip-link') && !element.classList.contains('sr-only');
        }).slice(0, 12).map(element => `${element.tagName}.${element.className}`),
        brokenImages: Array.from(document.images).filter(img => !img.closest('details:not([open])') && img.getBoundingClientRect().width > 0 && (!img.complete || img.naturalWidth === 0)).map(img => img.src),
        unreservedImages: Array.from(document.images).filter(img => !img.hasAttribute('width') || !img.hasAttribute('height')).map(img => img.src),
        h1Count: document.querySelectorAll('h1').length,
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        links: Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')),
        emptyLinks: Array.from(document.querySelectorAll('a[href]')).filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
        scheduleDateOverflow: Array.from(document.querySelectorAll('.schedule-date')).flatMap(date => {
          const bounds = date.getBoundingClientRect();
          return Array.from(date.children).filter(label => {
            const range = document.createRange();
            range.selectNodeContents(label);
            return Array.from(range.getClientRects()).some(rect => rect.left < bounds.left - 1 || rect.right > bounds.right + 1);
          }).map(label => label.textContent.trim());
        }),
        cls: window.__qa.cls,
      }));
      const slug = route === '/' ? 'index' : route.replace('/', '').replace('.html', '');
      await page.screenshot({ path: `validation/screenshots/${slug}-${width}.png`, fullPage: true });
      if (width === 1440 || width === 375) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        accessibility.push({ route, width, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incomplete: axe.incomplete.map(v => ({ id: v.id, help: v.help })) });
        check(axe.violations.length === 0, `Accessibility ${route} ${width}: ${axe.violations.map(v => v.id).join(', ')}`);
      }
      for (const href of inspection.links) {
        if (href.startsWith('/') || href.startsWith('#')) localLinks.add(new URL(href, base + route).href);
        else if (href.startsWith('https://')) externalLinks.add(href);
      }
      check(response?.status() === 200, `${route} ${width}: HTTP ${response?.status()}`);
      check(inspection.scrollWidth <= width, `${route} ${width}: horizontal overflow ${inspection.scrollWidth}`);
      check(inspection.overflowing.length === 0, `${route} ${width}: overflowing elements ${inspection.overflowing.join(', ')}`);
      check(inspection.brokenImages.length === 0, `${route} ${width}: broken images`);
      check(inspection.unreservedImages.length === 0, `${route} ${width}: missing image dimensions`);
      check(inspection.h1Count === 1 && inspection.description && inspection.canonical, `${route} ${width}: missing page metadata or H1`);
      check(inspection.emptyLinks === 0, `${route} ${width}: placeholder links`);
      check(inspection.scheduleDateOverflow.length === 0, `${route} ${width}: date labels extend outside their column (${inspection.scheduleDateOverflow.join(', ')})`);
      check(pageErrors.length === 0 && localErrors.length === 0, `${route} ${width}: local errors ${[...pageErrors, ...localErrors].join(', ')}`);
      const { links, ...rest } = inspection;
      results.push({ route, width, status: response?.status(), ...rest, initialMetrics, pageErrors, localErrors, externalErrors });
      console.log(`${slug} @ ${width}: overflow=${inspection.scrollWidth > width}, images=${inspection.brokenImages.length}, CLS=${inspection.cls.toFixed(4)}`);
      page.removeAllListeners('pageerror');
      page.removeAllListeners('response');
      page.removeAllListeners('requestfailed');
    }
    if (width < 1100) {
      await page.goto(base, { waitUntil: 'domcontentloaded' });
      const toggle = page.locator('.mobile-menu summary');
      await toggle.focus();
      await page.keyboard.press('Enter');
      check(await page.locator('.mobile-menu').getAttribute('open') !== null, `Menu ${width}: Enter did not open`);
      await page.keyboard.press('Escape');
      check(await page.locator('.mobile-menu').getAttribute('open') === null, `Menu ${width}: Escape did not close`);
      check(await toggle.evaluate(el => el === document.activeElement), `Menu ${width}: focus not restored`);
      await toggle.click();
      await page.locator('.mobile-menu a[href="/precios.html"]').click();
      await page.waitForURL('**/precios.html');
      interactions.push({ test: 'mobile-menu-keyboard-and-navigation', width, passed: true });
    }
    await context.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const linkResults = [];
  for (const href of localLinks) {
    const url = new URL(href);
    const response = await page.request.get(url.href.split('#')[0]);
    let anchorExists = null;
    if (url.hash && response.ok()) {
      const html = await response.text();
      anchorExists = html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`);
      check(anchorExists, `Missing anchor: ${href}`);
    }
    check(response.ok(), `Broken local link: ${href} (${response.status()})`);
    linkResults.push({ path: url.pathname + url.hash, status: response.status(), anchorExists });
  }
  for (const path of ['/index.html', '/sitemap.xml', '/robots.txt', '/404.html']) {
    const response = await page.request.get(base + path);
    check(response.ok(), `Static file ${path}: ${response.status()}`);
    linkResults.push({ path, status: response.status() });
  }
  await page.goto(base + '/artistas.html', { waitUntil: 'domcontentloaded' });
  const artists = JSON.parse(await readFile('src/data/artists.json', 'utf8'));
  const artistText = await page.locator('main').innerText();
  check(artists.every(a => artistText.includes(a.name)), 'Artist roster lost names');
  interactions.push({ test: 'all-31-artist-records', passed: artists.every(a => artistText.includes(a.name)) });

  await page.goto(base + '/talleres.html', { waitUntil: 'domcontentloaded' });
  for (const day of ['jueves', 'viernes', 'sabado', 'domingo']) {
    await page.locator(`.day-nav a[href="#${day}"]`).click();
    await page.waitForTimeout(200);
    const top = await page.locator(`#${day}`).evaluate(el => el.getBoundingClientRect().top);
    check(top >= 140 && top <= 190, `Day anchor ${day}: hidden by sticky navigation (${top})`);
  }
  interactions.push({ test: 'schedule-day-navigation', passed: true });

  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const media = await page.locator('video').evaluate(async video => {
    if (!(video instanceof HTMLVideoElement)) return { playable: false, error: 'Missing video element' };
    video.muted = true;
    video.load();
    return Promise.race([
      new Promise(resolve => {
        video.addEventListener('loadedmetadata', async () => {
          try {
            await video.play();
            setTimeout(() => { const currentTime = video.currentTime; video.pause(); resolve({ playable: currentTime > 0, duration: video.duration, width: video.videoWidth, height: video.videoHeight, currentTime }); }, 1200);
          } catch (error) { resolve({ playable: false, error: String(error) }); }
        }, { once: true });
        video.addEventListener('error', () => resolve({ playable: false, error: video.error?.message }), { once: true });
      }),
      new Promise(resolve => setTimeout(() => resolve({ playable: false, error: 'timeout' }), 15000)),
    ]);
  });
  check(media.playable, `Local delivery video cannot play: ${JSON.stringify(media)}`);
  interactions.push({ test: 'local-video-real-playback', ...media });

  await page.goto(base + '/contacto.html', { waitUntil: 'domcontentloaded' });
  check(await page.locator('iframe[src*="youtube"]').count() === 0, 'YouTube loaded before consent/click');
  for (const frame of await page.locator('[data-video]').all()) {
    const id = await frame.getAttribute('data-video');
    await frame.locator('a').first().click();
    await frame.locator('iframe').waitFor();
    const src = await frame.locator('iframe').getAttribute('src');
    check(src.includes(`youtube-nocookie.com/embed/${id}`), `Incorrect YouTube ${id}`);
  }
  interactions.push({ test: 'four-youtube-facades', passed: true, note: 'Verified iframe activation and official source. Playback restrictions may depend on YouTube/account/region.' });
  const maps = await page.locator('.map-frame iframe').evaluateAll(frames => frames.map(frame => ({ title: frame.title, source: frame.src, width: frame.getBoundingClientRect().width, height: frame.getBoundingClientRect().height })));
  check(maps.length === 1 && maps.every(map => map.source.includes('Almafuerte+40') && map.width > 0 && map.height >= 298 && map.height <= 300), 'The confirmed Hotel Estilo MB location must have a reserved map');
  interactions.push({ test: 'confirmed-event-location-map', maps });
  await page.close();

  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
  const fallback = await nojs.newPage();
  await fallback.goto(base + '/contacto.html');
  await fallback.locator('.mobile-menu summary').click();
  check(await fallback.locator('.mobile-menu nav').isVisible(), 'No-JS menu does not work');
  check((await fallback.locator('.video-trigger').first().getAttribute('href')).includes('youtube.com/watch'), 'No-JS video fallback missing');
  await nojs.close();
  interactions.push({ test: 'no-javascript-menu-and-video-links', passed: true });

  await writeFile('validation/links.json', JSON.stringify({ internal: linkResults, externalPreserved: [...externalLinks] }, null, 2));
} catch (error) { failures.push(error.stack || String(error)); }
finally { await browser.close(); }

const report = { testedAt: new Date().toISOString(), base, widths, pageChecks: results.length, screenshots: results.length, failures, results, accessibility, interactions, note: 'Local production build. Browser metrics are lab observations without mobile CPU/network throttling, not field Core Web Vitals.' };
await writeFile('validation/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pageChecks: results.length, accessibilityChecks: accessibility.length, failures, interactions }, null, 2));
assert.equal(failures.length, 0, `${failures.length} validation failure(s); see validation/report.json`);
