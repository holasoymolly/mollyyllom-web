'use client';

import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TransitionLink } from '@/components/TransitionLink';
import { ProtectedImage } from '@/components/ProtectedImage';
import { useLanguage } from '@/context/LanguageContext';
import { getImageDimensions } from '@/lib/imageDimensions';
import type { Bilingual, Project, StoryBlock, StoryImage, StoryWidth } from '../../../projects';
import { projectTitle } from '../../../projects';
import { Carousel } from './Carousel';
import { Compare } from './Compare';
import s from './story.module.css';

/** Subtle entrance for each block as it comes into view. */
const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -8% 0px' },
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
} as const;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Videos in a story must start on a still, never on a black frame: each one
 * needs `<name>-poster.webp` beside it. Warn in development when it is missing.
 */
const warnPosters = (srcs: string[]) => {
  if (process.env.NODE_ENV === 'production') return;
  srcs
    .filter((src) => /\.(mp4|webm|mov)$/i.test(src) && !getImageDimensions(src.replace(/\.(mp4|webm|mov)$/i, '-poster.webp')))
    .forEach((src) => console.warn(`[story] ${src} has no -poster.webp: it will start on a black frame.`));
};

/** Width ÷ height of a piece, from the build-time manifest. */
const ratioOf = (src: string) => {
  const d = getImageDimensions(src);
  return d ? d.width / d.height : 1;
};

/**
 * A story image that is never shown larger than its file holds on a 2×
 * screen: it fills its column up to half its pixel width, then stops (and
 * centres) instead of stretching.
 */
const Img: FC<{ src: string; alt: string; sizes: string; priority?: boolean }> = ({ src, alt, sizes, priority }) => {
  const d = getImageDimensions(src);
  return (
    <div style={{ maxWidth: d ? Math.round(d.width / 2) : undefined, marginInline: 'auto' }}>
      <ProtectedImage src={src} alt={alt} sizes={sizes} priority={priority} className="w-full h-auto" />
    </div>
  );
};

/**
 * The case page told in chapters (Nov 2026 refresh, direction B). Rendered by
 * ProjectPage when a project has a `story`; every other project keeps the
 * classic layout. The prev/next bar, the quote banner and the footer stay in
 * ProjectPage, so both layouts end the same way.
 */
export const StoryPage: FC<{ project: Project }> = ({ project }) => {
  const { lang, t } = useLanguage();
  const story = project.story!;
  const L = (b?: Bilingual) => (b ? b[lang] : '');
  const pick = (es?: string | string[], en?: string | string[]) => (lang === 'en' ? en ?? es : es);

  const title = projectTitle(project, lang);
  const client = pick(project.client, project.clientEn) as string | undefined;
  const role = pick(project.role, project.roleEn) as string | undefined;
  const scope = pick(project.scope, project.scopeEn) as string[] | undefined;
  const shipped = pick(project.shipped, project.shippedEn) as string[] | undefined;
  const outcome = pick(project.outcome, project.outcomeEn) as string[] | undefined;
  const credits = pick(project.credits, project.creditsEn) as string[] | undefined;

  // The last chapter is always what shipped, built from the case fields.
  const deliveryId = 'entregas';
  const chapters = [
    ...story.chapters.map((c) => ({ id: c.id, label: L(c.label) })),
    ...(shipped?.length || outcome?.length ? [{ id: deliveryId, label: t.projects.shipped }] : []),
  ];
  const total = chapters.length;

  // Header height, so the index and the phone chapter bar sit right under it.
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const header = document.querySelector('header');
    const set = () => {
      root.current?.style.setProperty('--head', `${header?.offsetHeight ?? 103}px`);
      // Page width without the scrollbar, for blocks that run edge to edge.
      root.current?.style.setProperty('--vw', `${document.documentElement.clientWidth}px`);
    };
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  // Which chapter is being read (-1 before the first one starts).
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.innerHeight * 0.35;
      let k = -1;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top < y) k = i;
      });
      setActive(k);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // chapters only change with the language, ids stay the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug]);

  // Wide and bleed blocks run under the index column, so the index steps aside
  // whenever any of them (with its captions and controls) overlaps the index
  // vertically, with some air. Measured, not guessed: it holds at the end of
  // the story too, where the last wide block slides under the sticky index.
  const nav = useRef<HTMLElement>(null);
  const [wideInView, setWideInView] = useState(false);
  useEffect(() => {
    const air = 32;
    let frame = 0;
    const check = () => {
      frame = 0;
      const n = nav.current?.getBoundingClientRect();
      if (!n || n.height === 0) return setWideInView(false);
      let hit = false;
      root.current?.querySelectorAll('[data-wide]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > n.top - air && r.top < n.bottom + air) hit = true;
      });
      setWideInView(hit);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [project.slug, lang]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const caption = (img: StoryImage, extra = '') =>
    img.title || img.detail ? (
      <figcaption className={`${s.cap} ${extra}`}>
        {img.title && <span className={s.capTitle}>{L(img.title)}</span>}
        {img.detail && <span className={s.capDetail}>{L(img.detail)}</span>}
      </figcaption>
    ) : null;

  const alt = (img: StoryImage) => [L(img.title), L(img.detail)].filter(Boolean).join(', ') || title;

  /** Wrapper class and marker for a block's width (wide and bleed push the index aside). */
  const span = (w: StoryWidth | 'solo' | undefined) =>
    w === 'bleed'
      ? { className: s.bleed, 'data-wide': true }
      : w === 'wide' || w === 'solo'
        ? { className: s.wide, 'data-wide': true }
        : { className: '' };

  const renderBlock = (block: StoryBlock, key: string): ReactNode => {
    switch (block.kind) {
      case 'stats':
        return (
          <motion.div key={key} className={`${s.stats} ${s.block}`} {...reveal}>
            {block.items.map((it) => (
              <div key={it.value}>
                <span className={s.statValue}>{it.value}</span>
                <span className={s.statLabel}>{L(it.label)}</span>
              </div>
            ))}
          </motion.div>
        );
      case 'image': {
        const w = span(block.size);
        const img = block.image;
        return (
          <motion.figure key={key} className={`${w.className} ${s.block}`} data-wide={w['data-wide']} {...reveal}>
            <div className={block.size === 'solo' ? s.solo : undefined}>
              <Img
                src={img.src}
                alt={alt(img)}
                sizes={block.size === 'bleed' ? '100vw' : block.size === 'column' ? '(max-width: 767px) 100vw, 900px' : '(max-width: 767px) 100vw, 75vw'}
              />
            </div>
            {caption(img, block.size === 'bleed' ? s.bleedCap : '')}
          </motion.figure>
        );
      }
      case 'mosaic':
        return (
          <motion.div key={key} className={`${s.wide} ${s.block}`} data-wide {...reveal}>
            <div className={s.mosaic}>
              {block.columns.map((c) => (
                <span key={c.es} className={s.mosaicHead}>
                  {L(c)}
                </span>
              ))}
              {block.rows.map((row, r) => (
                <Rows key={row.title.es} num={pad(r + 1)} title={L(row.title)}>
                  {row.images.map((src, i) => (
                    <div key={src} className={s.mosaicCell}>
                      <ProtectedImage
                        src={src}
                        alt={`${L(row.title)}, ${L(block.columns[i])}`}
                        sizes="25vw"
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </Rows>
              ))}
            </div>
            {/* Phones: one carousel per subject instead of a long 2-column grid. */}
            <div className={s.mosaicPhone}>
              {block.rows.map((row, r) => (
                <div key={row.title.es} className={s.mosaicPhoneRow}>
                  <p className={s.mosaicRow}>
                    <span className={s.num}>{pad(r + 1)}</span>
                    {L(row.title)}
                  </p>
                  <Carousel label={t.projects.views} prevLabel={t.projects.prevItem} nextLabel={t.projects.nextItem}>
                    {row.images.map((src, i) => (
                      <figure key={src} className={s.mosaicSlide}>
                        <ProtectedImage src={src} alt={`${L(row.title)}, ${L(block.columns[i])}`} sizes="80vw" className="w-full h-auto" />
                        <figcaption className={s.cap}>
                          <span className={s.capDetail}>{L(block.columns[i])}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </Carousel>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'carousel': {
        const w = span(block.width);
        warnPosters(block.items.map((it) => it.src));
        return (
          <motion.div key={key} className={`${w.className} ${s.block}`} data-wide={w['data-wide']} {...reveal}>
            <Carousel label={L(block.label)} prevLabel={t.projects.prevItem} nextLabel={t.projects.nextItem}>
              {block.items.map((img) =>
                block.large ? (
                  <figure key={img.src} className={s.slideLarge}>
                    <div className={s.slideLargeImg} style={{ aspectRatio: ratioOf(img.src).toFixed(4) }}>
                      <ProtectedImage src={img.src} alt={alt(img)} fill sizes={`${Math.ceil(ratioOf(img.src) * 62)}vh`} className="object-cover" />
                    </div>
                    {caption(img)}
                  </figure>
                ) : (
                  <figure key={img.src} className={s.slide}>
                    <ProtectedImage src={img.src} alt={alt(img)} sizes="(max-width: 767px) 66vw, 330px" className="w-full h-auto" />
                    {caption(img)}
                  </figure>
                ),
              )}
            </Carousel>
          </motion.div>
        );
      }
      case 'pairs': {
        const w = span(block.width);
        const pairs = block.items.map((p) => {
          // Columns in proportion to each piece's ratio, so both share one height.
          const cols = `${ratioOf(p.a.src).toFixed(3)}fr ${ratioOf(p.b.src).toFixed(3)}fr`;
          return (
            <div key={p.b.src} className={s.pair}>
              <p className={s.pairTitle}>{L(p.title)}</p>
              <div className={s.pairGrid} style={{ '--cols': cols } as CSSProperties}>
                {[p.a, p.b].map((img) => (
                  <figure key={img.src}>
                    <ProtectedImage src={img.src} alt={`${L(p.title)}, ${L(img.detail)}`} sizes="(max-width: 767px) 100vw, 60vw" className="w-full h-auto" />
                    {caption({ src: img.src, title: img.title, detail: img.detail })}
                  </figure>
                ))}
              </div>
            </div>
          );
        });
        return (
          <motion.div key={key} className={`${w.className} ${s.block}`} data-wide={w['data-wide']} {...reveal}>
            {block.static ? (
              <div className={s.pairsStack}>{pairs}</div>
            ) : (
              <Carousel label={L(block.label)} prevLabel={t.projects.prevItem} nextLabel={t.projects.nextItem}>
                {pairs}
              </Carousel>
            )}
          </motion.div>
        );
      }
      case 'compare': {
        const w = span(block.width);
        return (
          <motion.div key={key} className={`${w.className} ${s.block}`} data-wide={w['data-wide']} {...reveal}>
            <div className={block.width && block.width !== 'column' ? s.centred : undefined}>
              <Compare
                label={`${L(block.before.title)} / ${L(block.after.title)}`}
                before={{ src: block.before.src, title: L(block.before.title), detail: L(block.before.detail) }}
                after={{ src: block.after.src, title: L(block.after.title), detail: L(block.after.detail) }}
                hint={L(block.hint)}
              />
            </div>
          </motion.div>
        );
      }
      case 'details': {
        const w = span(block.width);
        return (
          <div key={key} className={`${w.className} ${s.details} ${s.block}`} data-wide={w['data-wide']}>
            {block.groups.map((g) => (
              <motion.div key={g.title.es + g.real.src} className={s.detailGroup} {...reveal}>
                <p className={s.detailTitle}>{L(g.title)}</p>
                <div className={s.detailPair}>
                  {[g.real, g.final].map((img) => (
                    <figure key={img.src}>
                      <div className={s.detailTile}>
                        <ProtectedImage src={img.src} alt={`${L(g.title)}, ${L(img.detail)}`} fill sizes="(max-width: 767px) 45vw, 22vw" className="object-cover" />
                      </div>
                      {caption({ src: img.src, title: img.title, detail: img.detail })}
                    </figure>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );
      }
      case 'wall': {
        const w = span(block.width);
        warnPosters(block.items.map((it) => it.src));
        const sizes = `(max-width: 767px) ${Math.round(100 / block.columns.phone)}vw, ${Math.round(100 / block.columns.desktop)}vw`;
        return (
          <motion.div key={key} className={`${w.className} ${s.block}`} data-wide={w['data-wide']} {...reveal}>
            <div className={s.wall} style={{ '--cd': block.columns.desktop, '--cp': block.columns.phone } as CSSProperties}>
              {block.items.map((img) => (
                <figure key={img.src}>
                  {block.ratio ? (
                    <div className={s.wallTile} style={{ aspectRatio: block.ratio, background: block.ground }}>
                      <ProtectedImage src={img.src} alt={alt(img)} fill sizes={sizes} className={block.fit === 'contain' ? 'object-contain' : 'object-cover'} />
                    </div>
                  ) : (
                    <div style={{ background: block.ground }}>
                      <Img src={img.src} alt={alt(img)} sizes={sizes} />
                    </div>
                  )}
                  {caption(img)}
                </figure>
              ))}
            </div>
          </motion.div>
        );
      }
      case 'palette':
        return (
          <motion.div key={key} className={`${s.palette} ${s.block}`} {...reveal}>
            {block.colors.map((c) => (
              <div key={c.hex} className={s.swatch}>
                <span className={s.chip} style={{ background: c.hex }} />
                {c.name && <span className={s.capTitle}>{L(c.name)}</span>}
                <span className={s.code}>{c.hex.toUpperCase()}</span>
                {c.codes?.map((code) => (
                  <span key={code} className={s.code}>
                    {code}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        );
    }
  };

  const factList = [
    client && { k: t.projects.client, v: client },
    project.year && { k: t.projects.year, v: project.year },
    role && { k: t.projects.role, v: role },
    scope?.length && { k: t.projects.scope, v: scope.join(' · ') },
  ].filter(Boolean) as { k: string; v: string }[];

  const coverSrc = story.cover.media ?? project.heroImage;
  const coverStyle = {
    ...(story.cover.ground ? { background: story.cover.ground } : {}),
    '--ar': ratioOf(coverSrc).toFixed(4),
  } as CSSProperties;
  const back = (
    <TransitionLink href="/proyectos" className={s.back}>
      <span aria-hidden>←</span>
      {t.projects.backLink}
    </TransitionLink>
  );

  return (
    <div ref={root} className={`${s.root} ${wideInView ? s.indexAside : ''}`}>
      <motion.div className={s.progress} style={{ scaleX: progress }} aria-hidden />

      {/* Cover */}
      {story.cover.variant === 'over' ? (
        <section className={s.coverOver} style={coverStyle}>
          <div className={s.coverImg}>
            <ProtectedImage
              src={coverSrc}
              alt={`${title}, ${lang === 'en' ? 'cover' : 'portada'}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: story.cover.focus ?? '50% 50%' }}
            />
          </div>
          <div className={s.coverText}>
            {back}
            <h1 className={s.title}>{title}</h1>
            <p className={s.promise}>{L(story.cover.promise)}</p>
          </div>
        </section>
      ) : (
        <>
          <section className={s.coverTop}>
            <div>
              {back}
              <h1 className={s.title}>{title}</h1>
            </div>
            <p className={s.promise}>{L(story.cover.promise)}</p>
          </section>
          <div className={s.coverTopImg} style={coverStyle}>
            <ProtectedImage src={coverSrc} alt={`${title}, ${lang === 'en' ? 'cover' : 'portada'}`} priority sizes="100vw" className="w-full h-auto" />
          </div>
        </>
      )}

      {factList.length > 0 && (
        <dl className={s.facts}>
          {factList.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Where it came from: the same subject before and after */}
      {story.origin && (
        <section className={s.origin}>
          <motion.div className={s.originText} {...reveal}>
            <p className={s.kicker}>{L(story.origin.label)}</p>
            <h2 className={s.originHeading}>{L(story.origin.heading)}</h2>
            {story.origin.note && <p className={s.originNote}>{L(story.origin.note)}</p>}
          </motion.div>
          <div className={s.originPair}>
            {[story.origin.before, story.origin.after].map((img, i) => (
              <motion.figure key={img.src} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }}>
                <ProtectedImage src={img.src} alt={alt(img)} sizes="(max-width: 767px) 100vw, 45vw" className="w-full h-auto" />
                {caption(img)}
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      <div className={s.body}>
        <nav ref={nav} className={s.index} aria-label={t.projects.chapters}>
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className={i === active ? s.on : undefined} aria-current={i === active ? 'true' : undefined}>
                  <span className={s.num}>{pad(i + 1)}</span>
                  <span>{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={s.main}>
          {/* Phone chapter bar: takes no room, shows up once the first chapter starts. */}
          <div className={s.currentWrap} aria-hidden>
            <div className={`${s.current} ${active < 0 ? s.currentIdle : ''}`}>
              <span className={s.num}>{pad(Math.max(active, 0) + 1)}</span>
              <span>{chapters[Math.max(active, 0)]?.label}</span>
            </div>
          </div>

          {story.chapters.map((c, i) => (
            <section key={c.id} id={c.id} className={s.chapter}>
              <motion.div {...reveal}>
                <div className={s.chapterRow}>
                  <span className={s.kicker}>
                    {pad(i + 1)} · {L(c.label)}
                  </span>
                  <span className={s.chapterCount}>
                    {pad(i + 1)} / {pad(total)}
                  </span>
                </div>
                <h2 className={s.heading}>{L(c.heading)}</h2>
                {c.text && <p className={s.lead}>{L(c.text)}</p>}
              </motion.div>
              {c.blocks?.map((b, j) => renderBlock(b, `${c.id}-${j}`))}
            </section>
          ))}
        </div>
      </div>

      {/* Closing image, near full bleed, caption below it (never on the image) */}
      {story.closing && (
        <>
          <motion.figure className={s.closing} {...reveal}>
            <ProtectedImage src={story.closing.image.src} alt={alt(story.closing.image)} sizes="100vw" className="w-full h-auto" />
            {caption(story.closing.image, s.closingCap)}
          </motion.figure>
          {story.closing.more && (
            <motion.div className={s.closingMore} {...reveal}>
              {story.closing.more.map((src) => (
                <ProtectedImage key={src} src={src} alt={title} sizes="(max-width: 767px) 50vw, 33vw" className="w-full h-auto" />
              ))}
            </motion.div>
          )}
        </>
      )}

      {/* What shipped, outcome, credits */}
      {Boolean(shipped?.length || outcome?.length) && (
        <div className={s.body}>
          <span />
          <div className={s.main}>
            <section id={deliveryId} className={s.chapter}>
              <motion.div {...reveal}>
                <div className={s.chapterRow}>
                  <span className={s.kicker}>
                    {pad(total)} · {t.projects.shipped}
                  </span>
                  <span className={s.chapterCount}>
                    {pad(total)} / {pad(total)}
                  </span>
                </div>
                {shipped && shipped.length > 0 && (
                  <ol className={s.shipped}>
                    {shipped.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                )}
              </motion.div>
              {outcome && outcome.length > 0 && (
                <motion.div className={s.outcome} {...reveal}>
                  <p className={s.kicker}>{t.projects.outcome}</p>
                  {outcome.map((o) => (
                    <p key={o} className={s.outcomeText}>
                      {o}
                    </p>
                  ))}
                  {credits && credits.length > 0 && (
                    <div className={s.credits}>
                      {credits.map((line) => {
                        const k = line.indexOf(':');
                        return (
                          <p key={line}>
                            {k > -1 ? line.slice(0, k + 1) : line} {k > -1 && <b>{line.slice(k + 1).trim()}</b>}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </section>
          </div>
        </div>
      )}
      <div className={s.end} />
    </div>
  );
};

/** One mosaic row: its title across the grid, then its cells. */
const Rows: FC<{ num: string; title: string; children: ReactNode }> = ({ num, title, children }) => (
  <>
    <p className={s.mosaicRow}>
      <span className={s.num}>{num}</span>
      {title}
    </p>
    {children}
  </>
);
