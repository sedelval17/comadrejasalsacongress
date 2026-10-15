import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const input = 'public/assets/original';
const output = 'public/assets/images';
await mkdir(output, { recursive: true });
await mkdir('src/data', { recursive: true });
await mkdir('public/assets/brand', { recursive: true });
// Recover the intact original lockup from the public poster; separate logo files are clipped.
await sharp(`${input}/lineup-group.jpg`).extract({ left: 250, top: 95, width: 580, height: 165 }).webp({ quality: 95 }).toFile('public/assets/brand/wordmark-from-official-poster.webp');
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;
// Resize only. No crop, enlargement, facial alteration or synthetic replacement.
for (const filename of (await readdir(input)).filter(file => /\.(png|jpe?g)$/i.test(file)).sort()) {
  const source = path.join(input, filename);
  const { width, height } = await sharp(source).metadata();
  const stem = filename.replace(/\.[^.]+$/, '');
  if (!width || !height) throw new Error(`Missing dimensions: ${filename}`);
  const widths = [...new Set([320, 640, 960, Math.min(width, 1280)].filter(value => value <= width))].sort((a,b) => a-b);
  const variants = [];
  for (const size of widths) {
    const webp = `${stem}-${size}.webp`;
    const avif = `${stem}-${size}.avif`;
    await Promise.all([
      sharp(source).resize({ width: size, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(output, webp)),
      sharp(source).resize({ width: size, withoutEnlargement: true }).avif({ quality: 58, effort: 3 }).toFile(path.join(output, avif)),
    ]);
    variants.push({ width: size, webp: `/assets/images/${webp}`, avif: `/assets/images/${avif}` });
  }
  originalBytes += (await stat(source)).size;
  optimizedBytes += (await stat(`public${variants.at(-1).webp}`)).size;
  manifest[filename] = { width, height, original: `/assets/original/${filename}`, variants };
}
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2) + '\n');
const report = { images: Object.keys(manifest).length, originalBytes, largestWebpBytes: optimizedBytes, reductionPercent: Math.round(100 - optimizedBytes/originalBytes*100), note: 'Total comparable: one largest WebP per source. Additional AVIF and responsive variants are stored separately.' };
await writeFile('research/image-optimization.json', JSON.stringify(report, null, 2));
console.log(report);
