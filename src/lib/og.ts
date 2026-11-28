import fs from 'node:fs';
import path from 'node:path';

/**
 * The share image of a case (server only): public/og/<slug>.jpg, 1200 × 630,
 * made by scripts/generate-og-images.js; the hero if that file is missing.
 */
export const ogImageFor = (slug: string, heroImage: string, alt: string) => {
  const file = path.join(process.cwd(), 'public', 'og', `${slug}.jpg`);
  return fs.existsSync(file) ? { url: `/og/${slug}.jpg`, width: 1200, height: 630, alt } : { url: heroImage, alt };
};
