import { launchBrowser } from './browser.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('research/screenshots/original', { recursive: true });
const browser = await launchBrowser();
const report = [];
for (const width of [375, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
  for (const route of ['index', 'el-mundial', 'battle-master', 'talleres', 'artistas', 'precios', 'contacto']) {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`https://comadrejaproducciones.com/${route === 'index' ? '' : `${route}.html`}`, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => null);
    await page.screenshot({ path: `research/screenshots/original/${route}-${width}.png`, fullPage: true });
    report.push({ route, width, status: response?.status(), errors, ...await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
      imagesWithoutDimensions: Array.from(document.images).filter(img => !img.hasAttribute('width') || !img.hasAttribute('height')).length,
    })) });
    console.log(`Original ${route} ${width}: capturado`);
    page.removeAllListeners('pageerror');
  }
  await page.close();
}
await browser.close();
await writeFile('research/original-browser.json', JSON.stringify(report, null, 2));
