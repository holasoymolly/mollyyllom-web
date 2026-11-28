#!/usr/bin/env node
/**
 * One share image per case: public/og/<slug>.jpg, 1200 × 630 JPEG, cut from
 * the case's heroImage. Social networks preview a case from og:image; the
 * hero itself is a 2800 px WebP of several hundred KB with no declared size,
 * which LinkedIn and WhatsApp do not always show. The case metadata uses
 * these files when they exist and falls back to the hero otherwise.
 *
 * Reads `slug` and `heroImage` (or the poster of `heroMedia`) from each `const …: Project = { … };` block in
 * src/projects.tsx. A file is only (re)written when missing or older than its
 * source, so the committed images make this a no-op. Runs in `prebuild`.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'og');
const src = fs.readFileSync(path.join(ROOT, 'src', 'projects.tsx'), 'utf8');

const cases = [];
for (const m of src.matchAll(/\nconst \w+: Project = \{([\s\S]*?)\n\};/g)) {
  const slug = (m[1].match(/\n  slug: "([^"]+)"/) || [])[1];
  // A case that opens on a logo animation (heroMedia) shares that frame: the poster of its hero video.
  const media = (m[1].match(/\n  heroMedia: \{ src: "([^"]+)"/) || [])[1];
  const hero = media ? media.replace(/\.(mp4|webm|mov)$/i, '-poster.webp') : (m[1].match(/\n  heroImage: "([^"]+)"/) || [])[1];
  if (slug && hero) cases.push({ slug, hero });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let written = 0;
  for (const { slug, hero } of cases) {
    const from = path.join(ROOT, 'public', hero);
    const to = path.join(OUT, `${slug}.jpg`);
    if (!fs.existsSync(from) || /\.(mp4|webm|mov|gif)$/i.test(hero)) {
      console.warn(`[og-images] ${slug}: no still hero (${hero}), skipped`);
      continue;
    }
    if (fs.existsSync(to) && fs.statSync(to).mtimeMs >= fs.statSync(from).mtimeMs) continue;
    await sharp(from).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(to);
    written++;
  }
  console.log(`[og-images] ${cases.length} cases, ${written} image(s) written → public/og/`);
})();
