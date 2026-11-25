'use client';

import Image, { type ImageProps } from 'next/image';
import { getImageDimensions } from '@/lib/imageDimensions';

interface ProtectedImageProps extends Omit<ImageProps, 'draggable' | 'width' | 'height'> {
  wrapperClassName?: string;
  width?: number;
  height?: number;
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

/** `/a/b.mp4` → `/a/b-poster.webp`, only when that file is in the manifest. */
const posterFor = (videoSrc: string): string | undefined => {
  const candidate = videoSrc.replace(VIDEO_EXT, '-poster.webp');
  return getImageDimensions(candidate) ? candidate : undefined;
};

/**
 * Smart drag/right-click-protected media. Wraps next/image so every image
 * call site gets AVIF/WebP, srcset, and lazy-loading for free, and falls
 * back to a muted autoplaying <video> when src points to .mp4/.webm/.mov
 * (used for animated portfolio thumbnails — much lighter than GIFs while
 * looking identical).
 *
 * Mode selection (in priority order):
 *   1. explicit `fill` prop  → fill mode (parent must be sized + relative)
 *   2. explicit `width` + `height` props → intrinsic mode
 *   3. src is found in the build-time image manifest → intrinsic mode
 *   4. fallback → fill mode
 *
 * For video sources `priority` switches preload from "metadata" → "auto"
 * so above-the-fold videos start loading immediately, mirroring how
 * `priority` behaves on next/image.
 *
 * A video whose first frame is nearly empty (a fade-in, a drop still falling)
 * gets a still: put `<name>-poster.webp` beside `<name>.mp4` and it becomes
 * the video's `poster`, found through the same manifest. Videos without one
 * keep showing their first frame, as before.
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
  priority,
  style,
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

  const isVideo = VIDEO_EXT.test(srcStr);
  const wrapperClasses = useFill
    ? `relative w-full h-full ${wrapperClassName}`.trim()
    : `relative ${wrapperClassName}`.trim();

  let inner: React.ReactNode;

  if (isVideo) {
    const videoClass = useFill
      ? `absolute inset-0 w-full h-full ${className ?? ''}`.trim()
      : (className ?? '');
    inner = (
      <video
        src={srcStr}
        poster={posterFor(srcStr)}
        autoPlay
        loop
        muted
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        aria-label={alt}
        className={videoClass}
        style={style}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        {...(useFill ? {} : { width: resolvedWidth, height: resolvedHeight })}
      />
    );
  } else {
    const unoptimized = srcStr.toLowerCase().endsWith('.gif');
    const resolvedSizes = sizes ?? (useFill ? '100vw' : undefined);
    inner = (
      <Image
        src={src}
        alt={alt}
        {...(useFill
          ? { fill: true }
          : { width: resolvedWidth!, height: resolvedHeight! })}
        unoptimized={unoptimized}
        sizes={resolvedSizes}
        priority={priority}
        style={style}
        className={className}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        {...rest}
      />
    );
  }

  return (
    <div className={wrapperClasses}>
      {inner}
      <div
        aria-hidden="true"
        className="absolute inset-0 select-none pointer-events-none"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};
