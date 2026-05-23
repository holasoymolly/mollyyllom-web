#!/usr/bin/env node
/**
 * Walks public/img/ and emits src/lib/image-dimensions.json mapping each
 * public-relative path to { width, height }. Used by next/image so gallery
 * images can render at their natural aspect ratio with zero CLS.
 *
 * Run via `npm run prebuild` (and standalone with `node scripts/generate-image-manifest.js`).
 */
const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROOT = path.join(PUBLIC_DIR, 'img');
const OUT = path.join(__dirname, '..', 'src', 'lib', 'image-dimensions.json');
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!EXTS.has(ext)) continue;
    try {
      const buf = fs.readFileSync(full);
      const { width, height } = imageSize(buf);
      const rel = '/' + path.relative(PUBLIC_DIR, full).split(path.sep).join('/');
      out[rel] = { width, height };
    } catch (err) {
      console.warn(`[image-manifest] skip ${full}: ${err.message}`);
    }
  }
}

const manifest = {};
walk(ROOT, manifest);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2) + '\n');
console.log(`[image-manifest] wrote ${Object.keys(manifest).length} entries → ${path.relative(process.cwd(), OUT)}`);
