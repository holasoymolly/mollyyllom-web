'use client';

import type { ImageLoaderProps } from 'next/image';
import { getImageDimensions } from './imageDimensions';
import variants from './image-variants.json';

/**
 * next/image loader that serves the WebP variants pre-rendered by
 * scripts/generate-image-variants.js (public/img-r/) instead of Vercel's
 * image optimizer, whose Hobby quota ran out on 26 Nov 2026 and left phones
 * with broken images (402). Static files have no quota.
 *
 * Anything without variants (not under /img/, not in the manifest, GIF, SVG,
 * remote URLs) is returned untouched.
 */
const LAST = variants.widths[variants.widths.length - 1];

/** Same rule as variantWidths() in scripts/generate-image-variants.js. */
function variantWidths(originalWidth: number): number[] {
  const max = Math.min(originalWidth, LAST);
  const ws = variants.widths.filter((w) => w < max);
  ws.push(max);
  return ws;
}

const RASTER = /\.(jpe?g|png|webp|avif)$/i;

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith('/img/') || !RASTER.test(src)) return src;
  const dims = getImageDimensions(src);
  if (!dims) return src;
  const ws = variantWidths(dims.width);
  const w = ws.find((candidate) => candidate >= width) ?? ws[ws.length - 1];
  return `${variants.dir}/${src.slice('/img/'.length).replace(RASTER, '')}-w${w}.webp`;
}
