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
const { execFileSync } = require('child_process');
const { imageSize } = require('image-size');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROOT = path.join(PUBLIC_DIR, 'img');
const OUT = path.join(__dirname, '..', 'src', 'lib', 'image-dimensions.json');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const VIDEO_EXTS = new Set(['.mp4', '.webm', '.mov']);

let ffprobeAvailable = null;
function probeVideo(file) {
  if (ffprobeAvailable === false) return null;
  try {
    const out = execFileSync('ffprobe', [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height',
      '-of', 'csv=s=x:p=0',
      file,
    ], { encoding: 'utf8' }).trim();
    ffprobeAvailable = true;
    const [w, h] = out.split('x').map(Number);
    if (!w || !h) return null;
    return { width: w, height: h };
  } catch (err) {
    if (err.code === 'ENOENT') {
      ffprobeAvailable = false;
      console.warn('[image-manifest] ffprobe not found; video files will be skipped');
    }
    return null;
  }
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    const rel = '/' + path.relative(PUBLIC_DIR, full).split(path.sep).join('/');
    try {
      if (IMAGE_EXTS.has(ext)) {
        const buf = fs.readFileSync(full);
        const { width, height } = imageSize(buf);
        out[rel] = { width, height };
      } else if (VIDEO_EXTS.has(ext)) {
        const dims = probeVideo(full);
        if (dims) out[rel] = dims;
      }
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
