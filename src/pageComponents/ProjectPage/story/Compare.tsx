'use client';

import { FC, useRef, useState } from 'react';
import { ProtectedImage } from '@/components/ProtectedImage';
import s from './story.module.css';

interface Side {
  src: string;
  title: string;
  detail: string;
}

interface CompareProps {
  before: Side;
  after: Side;
  hint: string;
  label: string;
}

/**
 * Before and after of the same frame. The line can be dragged (mouse and
 * touch), moved with the arrow keys, or sent to either side with the two
 * buttons beside it, which also name what each side is.
 */
export const Compare: FC<CompareProps> = ({ before, after, hint, label }) => {
  const box = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const [dragging, setDragging] = useState(false);

  const at = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return x;
    return ((clientX - r.left) / r.width) * 100;
  };
  const set = (v: number) => setX(Math.max(0, Math.min(100, v)));

  return (
    <div className={s.compareWrap}>
      <div
        ref={box}
        className={`${s.compare} ${dragging ? s.dragging : ''}`}
        style={{ ['--x' as string]: `${x}%` }}
        tabIndex={0}
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(x)}
        onPointerDown={(e) => {
          box.current?.setPointerCapture(e.pointerId);
          setDragging(true);
          set(at(e.clientX));
        }}
        onPointerMove={(e) => dragging && set(at(e.clientX))}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            set(x - 10);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            set(x + 10);
          }
        }}
      >
        <div className={s.compareLayer}>
          <ProtectedImage src={before.src} alt={`${before.title}, ${before.detail}`} fill sizes="(max-width: 767px) 100vw, 600px" className="object-cover" />
        </div>
        <div className={`${s.compareLayer} ${s.compareTop}`}>
          <ProtectedImage src={after.src} alt={`${after.title}, ${after.detail}`} fill sizes="(max-width: 767px) 100vw, 600px" className="object-cover" />
        </div>
        <span className={s.handle} aria-hidden />
      </div>
      <div className={s.compareSide}>
        {[
          { side: before, to: 100, arrow: '←', on: x > 75 },
          { side: after, to: 0, arrow: '→', on: x < 25 },
        ].map(({ side, to, arrow, on }) => (
          <button key={side.src} type="button" className={`${s.compareBtn} ${on ? s.compareBtnOn : ''}`} onClick={() => set(to)}>
            <span className={s.arrow} aria-hidden>
              {arrow}
            </span>
            <span>
              <strong>{side.title}</strong>
              {side.detail}
            </span>
          </button>
        ))}
        <p className={s.hint}>{hint}</p>
      </div>
    </div>
  );
};
