'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ProtectedImage } from '@/components/ProtectedImage';
import { getImageDimensions } from '@/lib/imageDimensions';

interface ProjectHeroProps {
  src: string;
  alt: string;
  /** Project.heroSwipe: how many subjects the phone hero snaps between. */
  swipe?: number;
  /** Labels for the dots, e.g. "Ver imagen 2 de 3". */
  dotLabel: (index: number, total: number) => string;
}

/**
 * Full-bleed case hero. By default the image covers a 50vh (phone) / 70vh
 * (desktop) band, as it always has.
 *
 * With `swipe`, phones get the whole image at the band's full height instead,
 * wider than the screen and scrollable sideways with native scroll-snap
 * (start, middle, end), opening on the middle subject. Dots under it show
 * where you are and jump on tap. From `md` up it is the same cropped band as
 * before: one element, one image request, so nothing loads twice.
 */
export const ProjectHero: FC<ProjectHeroProps> = ({ src, alt, swipe, dotLabel }) => {
  const dims = getImageDimensions(src);
  const swipes = Boolean(swipe && swipe > 1 && dims);
  const ratio = dims ? dims.width / dims.height : 1;
  const count = swipes ? swipe! : 0;
  const middle = Math.floor((count - 1) / 2);

  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(middle);

  const maxScroll = (el: HTMLDivElement) => el.scrollWidth - el.clientWidth;

  // Open on the middle subject (Molly, in Aerosolification), before paint.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !swipes) return;
    const centre = () => {
      const max = maxScroll(el);
      if (max > 0) el.scrollLeft = (max * middle) / (count - 1);
    };
    centre();
    // The width depends on 50vh, which iOS changes as its toolbar shows/hides
    // before first layout settles; re-centre once fonts and layout are done.
    const t = window.setTimeout(centre, 50);
    return () => window.clearTimeout(t);
  }, [swipes, middle, count]);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = maxScroll(el);
    if (max <= 0) return;
    setActive(Math.round((el.scrollLeft / max) * (count - 1)));
  }, [count]);

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: (maxScroll(el) * i) / (count - 1), behavior: 'smooth' });
  };

  if (!swipes) {
    return (
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <ProtectedImage src={src} alt={alt} fill sizes="100vw" quality={90} priority className="object-cover" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh]">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-hidden md:snap-none"
      >
        <div
          className="relative h-full md:!w-full"
          style={{ width: `max(100%, calc(50vh * ${ratio.toFixed(4)}))` }}
        >
          <ProtectedImage
            src={src}
            alt={alt}
            fill
            // Phones show the full width at 50vh, so the image is ~2× the screen.
            sizes={`(max-width: 767px) ${Math.ceil(50 * ratio)}vh, 100vw`}
            quality={90}
            priority
            className="object-cover"
          />
          {/* Snap targets: first subject, middle one(s), last one. */}
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`absolute top-0 h-px w-px ${
                i === 0 ? 'snap-start' : i === count - 1 ? 'snap-end' : 'snap-center'
              }`}
              style={
                i === 0 ? { left: 0 } : i === count - 1 ? { right: 0 } : { left: `${(i / (count - 1)) * 100}%` }
              }
            />
          ))}
        </div>
      </div>

      <div className="md:hidden absolute bottom-3 inset-x-0 flex justify-center gap-2 pointer-events-none">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={dotLabel(i + 1, count)}
            aria-current={i === active}
            className="pointer-events-auto p-1.5 -m-1.5"
          >
            <span
              className={`block h-1.5 rounded-full bg-white shadow-[0_0_3px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                i === active ? 'w-5 opacity-100' : 'w-1.5 opacity-60'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
