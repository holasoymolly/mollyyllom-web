'use client';

import { useState } from "react";
import { activeProjects, homeProjects, projectTitle } from "@/projects";
import { TransitionLink } from "@/components/TransitionLink";
import { ProtectedImage } from "@/components/ProtectedImage";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Which tiles are large. The grid reads as rows of two large tiles and rows of
 * three small ones, following `pattern` (home: 2 · 3, /proyectos: 2 · 3 · 3).
 * A tile left alone at the end joins the row before it.
 */
const largeTiles = (count: number, pattern: number[]): boolean[] => {
  const rows: number[] = [];
  for (let left = count, i = 0; left > 0; i++) {
    const row = Math.min(pattern[i % pattern.length], left);
    rows.push(row);
    left -= row;
  }
  if (rows.length > 1 && rows[rows.length - 1] === 1) {
    rows.pop();
    if (rows[rows.length - 1] === 3) {
      rows[rows.length - 1] = 2;
      rows.push(2);
    } else {
      rows[rows.length - 1] = 3;
    }
  }
  return rows.flatMap((row) => Array<boolean>(row).fill(row <= 2));
};

export const PortfolioGrid = ({
  showHeader = true,
  limit,
}: {
  showHeader?: boolean;
  /** Home grid: the first N of `homeProjects` (its own order). Omit to show every project. */
  limit?: number;
}) => {
  const { lang, t } = useLanguage();
  const items = limit ? homeProjects.slice(0, limit) : activeProjects;
  const large = largeTiles(items.length, limit ? [2, 3] : [2, 3, 3]);
  // Focus mode: only while the mouse is on a tile. Nothing is dimmed at rest, and
  // touch screens never get it (Molly, 27 nov 2026). The styles are in globals.css.
  const [focus, setFocus] = useState<number | null>(null);

  return (
    <section className="bg-stone-200">
      {/* Section header */}
      {showHeader && (
        <div className="px-6 md:px-16 lg:px-24 py-14 flex items-end justify-between border-b border-indigo-950/10">
          <div>
            <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase">
              {t.portfolio.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mt-2 leading-none">
              {t.portfolio.title}
            </h2>
          </div>
          <TransitionLink
            href="/proyectos"
            className="text-indigo-950 font-semibold hover:text-violet-500 transition-colors duration-300 text-sm tracking-wide flex items-center gap-1 group"
          >
            {t.portfolio.viewAll}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </TransitionLink>
        </div>
      )}

      {/* Grid */}
      <div
        className={`pg-grid px-6 md:px-16 lg:px-24 ${limit ? 'pg-grid-home' : ''}`}
        data-dim={focus !== null || undefined}
        onPointerLeave={() => setFocus(null)}
      >
        {items.map((item, index) => {
          const title = projectTitle(item, lang);
          const isLarge = large[index];
          const inner = (
            <>
              <div className="pg-media">
                <ProtectedImage
                  src={item.portfolioImage}
                  alt={title}
                  fill
                  lazyVideo
                  sizes={
                    isLarge
                      ? "(min-width: 700px) 50vw, 100vw"
                      : limit
                        ? "(min-width: 700px) 33vw, 100vw"
                        : "(min-width: 700px) 33vw, 50vw"
                  }
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="pg-caption">
                <p className="pg-label font-mono">
                  {(lang === 'en' ? item.gridLabelEn : item.gridLabel) ?? t.portfolio.brandingLabel}
                </p>
                <span className="pg-title">
                  {title}
                  <span className="pg-arrow" aria-hidden="true">→</span>
                </span>
                {item.year && <span className="pg-year font-mono">{item.year}</span>}
              </div>
            </>
          );

          const props = {
            className: `pg-tile ${isLarge ? 'pg-tile-lg' : ''}`,
            'data-focus': focus === index || undefined,
            onPointerEnter: (e: React.PointerEvent) => {
              if (e.pointerType === 'mouse') setFocus(index);
            },
          };

          if (item.slug) {
            return (
              <TransitionLink key={item.slug} href={`/proyectos/${item.slug}`} {...props}>
                {inner}
              </TransitionLink>
            );
          }

          return (
            <figure key={index} {...props}>
              {inner}
            </figure>
          );
        })}
      </div>
    </section>
  );
};
