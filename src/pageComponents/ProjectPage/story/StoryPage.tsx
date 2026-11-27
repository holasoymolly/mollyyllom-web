'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TransitionLink } from '@/components/TransitionLink';
import { ProtectedImage } from '@/components/ProtectedImage';
import { useLanguage } from '@/context/LanguageContext';
import type { Bilingual, Project, StoryBlock, StoryImage } from '../../../projects';
import { projectTitle } from '../../../projects';
import { Carousel } from './Carousel';
import { Compare } from './Compare';
import { getImageDimensions } from '@/lib/imageDimensions';
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
    const set = () => root.current?.style.setProperty('--head', `${header?.offsetHeight ?? 103}px`);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  // Which chapter is being read.
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.innerHeight * 0.35;
      let k = 0;
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
      case 'mosaic':
        return (
          <motion.div key={key} className={`${s.mosaic} ${s.block}`} {...reveal}>
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
                      sizes="(max-width: 767px) 50vw, 25vw"
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </Rows>
            ))}
          </motion.div>
        );
      case 'carousel':
        return (
          <motion.div key={key} className={s.block} {...reveal}>
            <Carousel label={L(block.label)} prevLabel={t.projects.prevItem} nextLabel={t.projects.nextItem}>
              {block.items.map((img) => (
                <figure key={img.src} className={s.slide}>
                  <ProtectedImage src={img.src} alt={alt(img)} sizes="(max-width: 767px) 66vw, 330px" className="w-full h-auto" />
                  {caption(img)}
                </figure>
              ))}
            </Carousel>
          </motion.div>
        );
      case 'pairs':
        return (
          <motion.div key={key} className={s.block} {...reveal}>
            <Carousel label={L(block.label)} prevLabel={t.projects.prevItem} nextLabel={t.projects.nextItem}>
              {block.items.map((p) => (
                <div key={p.b.src} className={s.pair}>
                  <p className={s.pairTitle}>{L(p.title)}</p>
                  <div className={s.pairGrid}>
                    <figure>
                      <ProtectedImage src={p.a.src} alt={`${L(p.title)}, ${L(p.a.detail)}`} sizes="(max-width: 767px) 56vw, 30vw" className="w-full h-auto" />
                      {caption({ src: p.a.src, detail: p.a.detail })}
                    </figure>
                    <figure>
                      <ProtectedImage src={p.b.src} alt={`${L(p.title)}, ${L(p.b.detail)}`} sizes="(max-width: 767px) 100vw, 50vw" className="w-full h-auto" />
                      {caption({ src: p.b.src, detail: p.b.detail })}
                    </figure>
                  </div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        );
      case 'compare':
        return (
          <motion.div key={key} className={s.block} {...reveal}>
            <Compare
              label={`${L(block.before.title)} / ${L(block.after.title)}`}
              before={{ src: block.before.src, title: L(block.before.title), detail: L(block.before.detail) }}
              after={{ src: block.after.src, title: L(block.after.title), detail: L(block.after.detail) }}
              hint={L(block.hint)}
            />
          </motion.div>
        );
      case 'details':
        return (
          <div key={key} className={`${s.details} ${s.block}`}>
            {block.items.map((img) => {
              const span = { third: s.spanThird, half: s.spanHalf, wide: s.spanWide, native: s.spanNative }[img.span];
              return (
                <motion.figure key={img.src} className={span} {...reveal}>
                  <NativeOrFull img={img} native={img.span === 'native'} alt={alt(img)} />
                  {caption(img)}
                </motion.figure>
              );
            })}
          </div>
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
  const ground = story.cover.ground ? { background: story.cover.ground } : undefined;
  const coverImage = (
    <ProtectedImage
      src={coverSrc}
      alt={`${title}, ${lang === 'en' ? 'cover' : 'portada'}`}
      fill
      priority
      sizes="100vw"
      className="object-cover"
      style={{ objectPosition: story.cover.focus ?? '50% 50%' }}
    />
  );
  const back = (
    <TransitionLink href="/proyectos" className={s.back}>
      <span aria-hidden>←</span>
      {t.projects.backLink}
    </TransitionLink>
  );

  return (
    <div ref={root} className={s.root}>
      <motion.div className={s.progress} style={{ scaleX: progress }} aria-hidden />

      {/* Cover */}
      {story.cover.variant === 'over' ? (
        <section className={s.coverOver} style={ground}>
          <div className={s.coverImg}>{coverImage}</div>
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
          <div className={s.coverTopImg} style={ground}>
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

      {/* Where it came from */}
      {story.origin && (
        <section className={s.origin}>
          <motion.figure className={s.originImg} {...reveal}>
            <ProtectedImage src={story.origin.image.src} alt={alt(story.origin.image)} sizes="(max-width: 767px) 75vw, 30vw" className="w-full h-auto" />
            {caption(story.origin.image)}
          </motion.figure>
          <motion.div className={s.originText} {...reveal}>
            <p className={s.kicker}>{L(story.origin.label)}</p>
            <h2 className={s.originHeading}>{L(story.origin.heading)}</h2>
            {story.origin.note && <p className={s.originNote}>{L(story.origin.note)}</p>}
          </motion.div>
        </section>
      )}

      <div className={s.body}>
        <nav className={s.index} aria-label={t.projects.chapters}>
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
          <div className={s.current} aria-hidden>
            <span className={s.num}>{pad(active + 1)}</span>
            <span>{chapters[active]?.label}</span>
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

      {/* Closing image, near full bleed */}
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

/**
 * A close-up either fills its column, or (native) shows at half its pixel
 * width so it is never enlarged past what the file holds on a 2× screen.
 */
const NativeOrFull: FC<{ img: StoryImage; native: boolean; alt: string }> = ({ img, native, alt }) => {
  if (!native) return <ProtectedImage src={img.src} alt={alt} sizes="(max-width: 767px) 100vw, 45vw" className="w-full h-auto" />;
  return <NativeImage src={img.src} alt={alt} />;
};

const NativeImage: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const dims = getImageDimensions(src);
  const w = dims ? Math.round(dims.width / 2) : 240;
  return (
    <div style={{ width: w, maxWidth: '100%' }}>
      <ProtectedImage src={src} alt={alt} sizes={`${w}px`} className="w-full h-auto" />
    </div>
  );
};
