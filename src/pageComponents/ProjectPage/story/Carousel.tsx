'use client';

import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import s from './story.module.css';

interface CarouselProps {
  /** Each child is one slide. */
  children: ReactNode[];
  /** What the slides are, shown before the counter ("Fotos de la visita"). */
  label: string;
  /** Accessible names for the arrows. */
  prevLabel: string;
  nextLabel: string;
}

/**
 * Horizontal slides that move every way a reader expects: arrows, mouse drag
 * on desktop, native swipe on phones and trackpads, and the arrow keys once
 * focused. Snapping is native scroll-snap; the mouse drag turns it off while
 * dragging and settles on the nearest slide in the direction of the gesture.
 */
export const Carousel: FC<CarouselProps> = ({ children, label, prevLabel, nextLabel }) => {
  const track = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false });
  const drag = useRef({ down: false, x0: 0, s0: 0, moved: 0, v: 0, lx: 0, id: 0 });
  const [dragging, setDragging] = useState(false);
  const count = children.length;

  const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];

  const nearest = useCallback(() => {
    const el = track.current;
    if (!el) return 0;
    let best = 0;
    let d = Infinity;
    slides().forEach((it, i) => {
      const dd = Math.abs(it.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (dd < d) {
        d = dd;
        best = i;
      }
    });
    return best;
  }, []);

  const go = useCallback((i: number) => {
    const el = track.current;
    const list = slides();
    if (!el || !list.length) return;
    const k = Math.max(0, Math.min(list.length - 1, i));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: list[k].offsetLeft - el.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const atEnd = el.scrollLeft > max - 4;
    setState({ index: atEnd ? count - 1 : nearest(), atStart: el.scrollLeft < 4, atEnd });
  }, [count, nearest]);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !track.current) return;
    drag.current = { down: true, x0: e.clientX, s0: track.current.scrollLeft, moved: 0, v: 0, lx: e.clientX, id: e.pointerId };
    track.current.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down || !track.current) return;
    d.moved = Math.max(d.moved, Math.abs(e.clientX - d.x0));
    d.v = e.clientX - d.lx;
    d.lx = e.clientX;
    track.current.scrollLeft = d.s0 - (e.clientX - d.x0);
  };
  const onPointerUp = () => {
    const d = drag.current;
    const el = track.current;
    if (!d.down || !el) return;
    d.down = false;
    setDragging(false);
    const dir = el.scrollLeft - d.s0;
    let base = slides().findIndex((it) => it.offsetLeft - el.offsetLeft >= d.s0 - 2);
    if (base < 0) base = count - 1;
    // A clear gesture moves one slide; a nudge settles back.
    go(Math.abs(dir) > 40 || Math.abs(d.v) > 6 ? base + (dir > 0 ? 1 : -1) : base);
  };

  return (
    <div>
      <div
        ref={track}
        className={`${s.track} ${dragging ? s.dragging : ''}`}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (drag.current.moved > 6) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(nearest() + 1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(nearest() - 1);
          }
        }}
      >
        {children}
      </div>
      <div className={s.controls}>
        <span className={s.count}>
          {label} · <b>{String(state.index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
        </span>
        <button type="button" className={s.arrow} onClick={() => go(nearest() - 1)} disabled={state.atStart} aria-label={prevLabel}>
          ←
        </button>
        <button type="button" className={s.arrow} onClick={() => go(nearest() + 1)} disabled={state.atEnd} aria-label={nextLabel}>
          →
        </button>
      </div>
    </div>
  );
};
