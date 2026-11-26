#!/usr/bin/env node
/**
 * Pre-renders every raster in public/img/ at the widths in
 * src/lib/image-variants.json, as WebP files under public/img-r/ (same path,
 * `-w<width>.webp` suffix). src/lib/imageLoader.ts points next/image at them,
 * so images are served as plain static files and never go through Vercel's
 * image optimizer.
 *
 * Why: on 26 Nov 2026 the Hobby plan's image-optimization quota ran out and
 * every /_next/image request that was not already cached answered
 * 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED. Desktop widths were cached, so
 * the site looked fine there, while phones (other widths) got broken images.
 *
 * A variant is only written when it is missing or older than its source, so
 * the committed variants make this a no-op; it runs in `prebuild` so a new
 * image added without running it still gets its variants on Vercel.
 *
 * Run standalone with `npm run image-variants`.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const config = require('../src/lib/image-variants.json');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SRC_ROOT = path.join(PUBLIC_DIR, 'img');
const OUT_ROOT = path.join(PUBLIC_DIR, config.dir.replace(/^\//, ''));
const ON_CI = Boolean(process.env.VERCEL || process.env.CI);
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

/** Same rule as variantWidths() in src/lib/imageLoader.ts: keep it in step. */
function variantWidths(originalWidth) {
  const max = Math.min(originalWidth, config.widths[config.widths.length - 1]);
  const ws = config.widths.filter((w) => w < max);
  ws.push(max);
  return ws;
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function processFile(file) {
  const rel = path.relative(SRC_ROOT, file);
  const base = rel.slice(0, -path.extname(rel).length);
  const srcTime = fs.statSync(file).mtimeMs;
  const meta = await sharp(file, { limitInputPixels: false }).metadata();
  // EXIF orientation 5–8 swaps the axes; next/image and the manifest see the
  // stored width, which is what the loader works from.
  const width = meta.width;
  let written = 0;
  for (const w of variantWidths(width)) {
    const out = path.join(OUT_ROOT, `${base}-w${w}.webp`);
    // A fresh clone (Vercel) gives every file the checkout time, so there
    // only existence counts; locally a replaced source re-renders its variants.
    if (fs.existsSync(out) && (ON_CI || fs.statSync(out).mtimeMs >= srcTime)) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(file, { limitInputPixels: false })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: config.quality, effort: 4 })
      .toFile(out);
    written++;
  }
  return written;
}

(async () => {
  const files = walk(SRC_ROOT, []);
  const started = Date.now();
  let written = 0;
  let next = 0;
  const workers = Array.from({ length: Math.max(1, os.cpus().length - 1) }, async () => {
    while (next < files.length) {
      const file = files[next++];
      try {
        const n = await processFile(file);
        written += n;
      } catch (err) {
        console.warn(`[image-variants] skip ${file}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);
  console.log(
    `[image-variants] ${files.length} images, ${written} variant(s) written in ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
})();
