'use client';

import Image, { type ImageProps } from 'next/image';
import { getImageDimensions } from '@/lib/imageDimensions';

interface ProtectedImageProps extends Omit<ImageProps, 'draggable' | 'width' | 'height'> {
  wrapperClassName?: string;
  width?: number;
  height?: number;
}

/**
 * Smart drag/right-click-protected image. Wraps next/image so every call site
 * gets AVIF/WebP, srcset, and lazy-loading for free.
 *
 * Mode selection (in priority order):
 *   1. explicit `fill` prop  → fill mode (parent must be sized + relative)
 *   2. explicit `width` + `height` props → intrinsic mode
 *   3. src is found in the build-time image manifest → intrinsic mode
 *   4. fallback → fill mode
 *
 * GIFs are automatically passed `unoptimized` so animation is preserved.
 */
export const ProtectedImage = ({
  wrapperClassName = '',
  fill,
  width,
  height,
  src,
  alt,
  className,
  sizes,
  ...rest
}: ProtectedImageProps) => {
  const srcStr = typeof src === 'string' ? src : '';
  const manifestDims = srcStr ? getImageDimensions(srcStr) : null;

  let useFill = false;
  let resolvedWidth: number | undefined;
  let resolvedHeight: number | undefined;

  if (fill) {
    useFill = true;
  } else if (width && height) {
    resolvedWidth = width;
    resolvedHeight = height;
  } else if (manifestDims) {
    resolvedWidth = manifestDims.width;
    resolvedHeight = manifestDims.height;
  } else {
    useFill = true;
  }

  const unoptimized = srcStr.toLowerCase().endsWith('.gif');
  const wrapperClasses = useFill
    ? `relative w-full h-full ${wrapperClassName}`.trim()
    : `relative ${wrapperClassName}`.trim();
  const resolvedSizes = sizes ?? (useFill ? '100vw' : undefined);

  return (
    <div className={wrapperClasses}>
      <Image
        src={src}
        alt={alt}
        {...(useFill
          ? { fill: true }
          : { width: resolvedWidth!, height: resolvedHeight! })}
        unoptimized={unoptimized}
        sizes={resolvedSizes}
        className={className}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        {...rest}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 select-none pointer-events-none"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};
