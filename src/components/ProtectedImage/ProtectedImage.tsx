'use client';

import { useEffect, useRef } from 'react';
import Image, { type ImageProps } from 'next/image';
import { getImageDimensions } from '@/lib/imageDimensions';

interface ProtectedImageProps extends Omit<ImageProps, 'draggable' | 'width' | 'height'> {
  wrapperClassName?: string;
  width?: number;
  height?: number;
  /**
   * For a wall of videos (the portfolio grid, with `fill`): a video with a
   * poster downloads nothing until it is on screen, and plays only while it is
   * there; until then its poster shows as a lazy, sized image. Without a poster
   * it behaves as before, since `preload="none"` would leave it blank.
   */
  lazyVideo?: boolean;
  /**
   * With `lazyVideo`: the poster loads first (preloaded, high priority) because
   * it is above the fold and is the page's largest paint, while the video still
   * waits until it is on screen. For the grid's first row.
   */
  posterPriority?: boolean;
}

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

/** `/a/b.mp4` → `/a/b-poster.webp`, only when that file is in the manifest. */
const posterFor = (videoSrc: string): string | undefined => {
  const candidate = videoSrc.replace(VIDEO_EXT, '-poster.webp');
  return getImageDimensions(candidate) ? candidate : undefined;
};

/**
 * Muted, looping, inline video that plays while it is on screen.
 *
 * `autoPlay` stays as the first try. On top of it, `muted` is set on the
 * element itself (React has a long history of leaving the property unset on
 * client-rendered videos, and browsers only autoplay muted ones), `play()` is
 * called when the video comes near the viewport and it pauses once it leaves,
 * so a long case page does not decode every video at once. When the browser
 * still refuses (Low Power Mode), the poster or first frame stays.
 */
const LoopingVideo = ({ onScreenOnly, ...props }: React.ComponentProps<'video'> & { onScreenOnly?: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const play = () => el.play().catch(() => {});
    if (typeof IntersectionObserver === 'undefined') {
      play();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : el.pause()),
      onScreenOnly ? { threshold: 0.15 } : { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [props.src, onScreenOnly]);

  return <video ref={ref} {...props} />;
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
 *   4. fallback → fill mode (images only; a video without known dimensions
 *      keeps its own aspect ratio instead, since fill would collapse it to
 *      0px inside an unsized parent)
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
  lazyVideo,
  posterPriority,
  ...rest
}: ProtectedImageProps) => {
  const srcStr = typeof src === 'string' ? src : '';
  const manifestDims = srcStr ? getImageDimensions(srcStr) : null;
  const isVideo = VIDEO_EXT.test(srcStr);

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
  } else if (!isVideo) {
    useFill = true;
  }
  const wrapperClasses = useFill
    ? `relative w-full h-full ${wrapperClassName}`.trim()
    : `relative ${wrapperClassName}`.trim();

  let inner: React.ReactNode;

  if (isVideo) {
    const poster = posterFor(srcStr);
    const onScreenOnly = Boolean(lazyVideo && poster && !priority && useFill);
    const videoClass = useFill
      ? `absolute inset-0 w-full h-full ${className ?? ''}`.trim()
      : (className ?? '');
    inner = (
      <>
      {/* The poster as a real image under the video: it gets the sized WebP
          variants and lazy loading that a `poster` attribute can't, so on a slow
          phone the still is there long before the video. An unloaded video is
          transparent and lets it show through. */}
      {onScreenOnly && poster && (
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes ?? '100vw'}
          quality={90}
          priority={posterPriority}
          fetchPriority={posterPriority ? 'high' : undefined}
          className={className}
          draggable={false}
        />
      )}
      <LoopingVideo
        src={srcStr}
        poster={onScreenOnly ? undefined : poster}
        autoPlay={!onScreenOnly}
        onScreenOnly={onScreenOnly}
        loop
        muted
        playsInline
        preload={priority ? 'auto' : onScreenOnly ? 'none' : 'metadata'}
        aria-label={alt}
        className={videoClass}
        style={style}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        {...(useFill ? {} : { width: resolvedWidth, height: resolvedHeight })}
      />
      </>
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
        // next/image's `priority` only preloads; without this the browser still
        // fetches the hero at low priority, behind every script (La Colmena's
        // hero finished at 4.2 s on a slow phone). Applies to the preload too.
        fetchPriority={priority ? 'high' : undefined}
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
