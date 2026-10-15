import { launchBrowser } from './browser.mjs';
import { writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = process.env.PAGES_TEST_ORIGIN || 'http://localhost:4322';
const prefix = '/comadrejasalsacongress';
const routes = ['/', '/el-mundial.html', '/battle-master.html', '/talleres.html', '/artistas.html', '/precios.html', '/contacto.html'];
const browser = await launchBrowser();
const failures = [];
const resources = new Set();
const screenshots = [];
await mkdir('validation/screenshots/pages', { recursive: true });
try {
  for (const width of [375, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const response = await page.goto(`${origin}${prefix}${route}`, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const inspection = await page.evaluate(async ({ prefix, route }) => {
        const raw = [];
        for (const node of document.querySelectorAll('[href], [src], [poster], [srcset]')) {
          for (const attribute of ['href', 'src', 'poster']) {
            const value = node.getAttribute(attribute);
            if (value?.startsWith('/')) raw.push(value);
          }
          for (const candidate of (node.getAttribute('srcset') || '').split(',').filter(Boolean)) {
            const value = candidate.trim().split(/\s+/)[0];
            if (value.startsWith('/')) raw.push(value);
          }
        }
        const canonical = document.querySelector('link[rel="canonical"]').href;
        const selected = document.querySelector('.desktop-nav [aria-current="page"]')?.getAttribute('href');
        return {
          rootEscapes: raw.filter(value => !value.startsWith(`${prefix}/`)),
          urls: raw,
          canonical,
          expectedCanonical: `https://sedelval17.github.io${prefix}${route}`,
          selected,
          expectedSelected: `${prefix}${route}`,
          robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      }, { prefix, route });
      assert.deepEqual(inspection.rootEscapes, [], `Escaped project path: ${route}`);
      assert.equal(inspection.canonical, inspection.expectedCanonical);
      assert.equal(inspection.selected, inspection.expectedSelected);
      assert.equal(inspection.robots, 'noindex, nofollow');
      assert.equal(inspection.overflow, false);
      inspection.urls.forEach(value => resources.add(value.split('#')[0]));
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 800) { scrollTo(0,y); await new Promise(resolve => setTimeout(resolve,30)); }
        scrollTo(0,0);
      });
      const slug = route === '/' ? 'index' : route.replace('/', '').replace('.html', '');
      const screenshot = `validation/screenshots/pages/${slug}-${width}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      screenshots.push(screenshot);
      console.log(`Pages ${route} ${width}: routes, canonical, menu and noindex OK`);
    }
    if (width === 375) {
      await page.goto(`${origin}${prefix}/`);
      await page.locator('.mobile-menu summary').click();
      await page.locator(`.mobile-menu a[href="${prefix}/precios.html"]`).click();
      await page.waitForURL(`**${prefix}/precios.html`);
    }
    await page.close();
  }
  const page = await browser.newPage();
  const checks = await Promise.all([...resources].map(async resource => {
    const result = await page.request.get(origin + resource);
    return { resource, status: result.status() };
  }));
  assert.deepEqual(checks.filter(result => result.status !== 200), []);
  const robots = await (await page.request.get(`${origin}${prefix}/robots.txt`)).text();
  assert.ok(robots.includes('Disallow: /'));
  const sitemap = await (await page.request.get(`${origin}${prefix}/sitemap.xml`)).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, 7);
  assert.equal((sitemap.match(/https:\/\/sedelval17.github.io\/comadrejasalsacongress\//g) || []).length, 7);
  console.log(`${checks.length} local resources served successfully`);
} catch (error) { failures.push(error.stack || String(error)); }
finally { await browser.close(); }
await writeFile('validation/github-pages.json', JSON.stringify({ testedAt: new Date().toISOString(), origin, prefix, screenshots, resourceCount: resources.size, failures }, null, 2));
assert.equal(failures.length, 0, failures.join('\n'));
