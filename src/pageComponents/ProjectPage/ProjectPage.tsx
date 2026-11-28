'use client';

import { FC, Fragment, ReactNode, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TransitionLink } from '@/components/TransitionLink';
import type { Project } from '../../projects';
import { projectTitle } from '@/lib/projectTitle';
import type { NavItem } from '@/lib/projectSlices';
import { QuoteBanner } from '@/components/QuoteBanner';
import { ProtectedImage } from '@/components/ProtectedImage';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { trackProjectViewed } from '@/lib/analytics';
import { ProjectHero } from './ProjectHero';
import { StoryPage } from './story/StoryPage';

/**
 * The route (a server component) passes this case's own data and its
 * neighbours (src/lib/projectSlices.ts), so the browser never downloads every
 * case to show one.
 */
interface ProjectPageProps {
  project?: Project;
  /** 1-based position of the case in `activeProjects`, for the NN / NN counter. */
  position: number;
  total: number;
  prev: NavItem | null;
  next: NavItem | null;
}

export const ProjectPage: FC<ProjectPageProps> = ({ project, position, total, prev: prevProject, next: nextProject }) => {
  const { lang, t } = useLanguage();

  const title = project ? projectTitle(project, lang) : '';
  const paragraphs = lang === 'en' ? project?.paragraphsEn : project?.paragraphs;
  const client = lang === 'en' ? project?.clientEn ?? project?.client : project?.client;
  const role = lang === 'en' ? project?.roleEn ?? project?.role : project?.role;
  const scope = lang === 'en' ? project?.scopeEn ?? project?.scope : project?.scope;
  const brief = lang === 'en' ? project?.briefEn ?? project?.brief : project?.brief;
  const shipped = lang === 'en' ? project?.shippedEn ?? project?.shipped : project?.shipped;
  const outcome = lang === 'en' ? project?.outcomeEn ?? project?.outcome : project?.outcome;
  const credits = lang === 'en' ? project?.creditsEn ?? project?.credits : project?.credits;

  /**
   * Text is broken into blocks so images can be dealt out between them: the
   * brief, the opening line, the rest of the copy, then what shipped and the
   * outcome. Projects with no case-study data simply produce fewer blocks, and
   * the images spread across whatever blocks exist.
   */
  const textBlocks: { key: string; content: ReactNode }[] = [];

  if (brief) {
    textBlocks.push({
      key: 'brief',
      content: (
        <div className="flex flex-col gap-3">
          <span className="text-violet-500 label-mono">
            {t.projects.brief}
          </span>
          <p className="text-lg text-indigo-950/70 leading-relaxed border-l-2 border-violet-500 pl-5">
            {brief}
          </p>
        </div>
      ),
    });
  }

  if (paragraphs && paragraphs.length > 0) {
    textBlocks.push({
      key: 'lead',
      content: (
        <p className="text-2xl md:text-3xl font-black text-indigo-950 leading-snug">{paragraphs[0]}</p>
      ),
    });

    if (paragraphs.length > 1) {
      textBlocks.push({
        key: 'body',
        content: (
          <>
            {paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-lg text-indigo-950/70 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </>
        ),
      });
    }
  }

  if ((shipped && shipped.length > 0) || (outcome && outcome.length > 0)) {
    /**
     * What shipped runs as a numbered two-column grid, so a long list stays
     * short; the outcome closes the block as one large statement across the
     * full width instead of a lone bullet beside a long column.
     */
    textBlocks.push({
      key: 'delivery',
      content: (
        <div className="flex flex-col gap-12">
          {shipped && shipped.length > 0 && (
            <div className="flex flex-col gap-6">
              <span className="text-violet-500 label-mono">
                {t.projects.shipped}
              </span>
              <ol className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                {shipped.map((item, i) => (
                  <li key={item} className="flex gap-4 border-t border-indigo-950/10 pt-4 text-indigo-950/70 leading-relaxed">
                    <span aria-hidden className="font-mono text-xs text-violet-500 pt-[0.35em] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {outcome && outcome.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-violet-500 label-mono">
                {t.projects.outcome}
              </span>
              <div className="flex flex-col gap-3 border-l-2 border-violet-500 pl-5">
                {outcome.map((item) => (
                  <p key={item} className="text-xl md:text-2xl font-black text-indigo-950 leading-snug">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    });
  }

  /**
   * Deal the images out across the text blocks. Remainders go to the earlier
   * groups so the page never ends on a lone orphan image.
   */
  const allImages = (lang === 'en' ? project?.imagesEn ?? project?.images : project?.images) ?? [];
  const groupCount = Math.max(textBlocks.length, 1);
  const baseSize = Math.floor(allImages.length / groupCount);
  const remainder = allImages.length % groupCount;
  const imageGroups: string[][] = [];
  let cursor = 0;
  for (let i = 0; i < groupCount; i += 1) {
    const size = baseSize + (i < remainder ? 1 : 0);
    imageGroups.push(allImages.slice(cursor, cursor + size));
    cursor += size;
  }

  /**
   * Let two more images run before the delivery block, so 'what shipped' and
   * the outcome land after the reader has seen more of the work rather than
   * arriving on the heels of the body copy.
   */
  const deliveryIndex = textBlocks.findIndex((block) => block.key === 'delivery');
  if (deliveryIndex > 0) {
    const moved = imageGroups[deliveryIndex].splice(0, 2);
    imageGroups[deliveryIndex - 1].push(...moved);
  }
  const meta = [
    client && { label: t.projects.client, value: client },
    project?.year && { label: t.projects.year, value: project.year },
    role && { label: t.projects.role, value: role },
  ].filter(Boolean) as { label: string; value: string }[];

  // Fire once per case study. `lang` is read through a ref so toggling the
  // language mid-read doesn't count as a second view.
  const langRef = useRef(lang);
  langRef.current = lang;
  useEffect(() => {
    if (!project) return;
    trackProjectViewed(project.slug, project.title, langRef.current);
  }, [project]);

  if (!project) {
    return (
      <div>
        <Header />
        <main className="flex flex-col justify-center items-center h-[80vh] text-center px-6">
          <h1 className="text-5xl font-black text-indigo-950">{t.projects.notFound}</h1>
          <p className="text-indigo-950/60 mt-4">{t.projects.notFoundSub}</p>
          <TransitionLink href="/proyectos" className="mt-8 bg-indigo-950 text-stone-200 font-bold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-violet-500">
            {t.projects.viewAll}
          </TransitionLink>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      {/*
        Cases told in chapters (Nov 2026 refresh) render StoryPage; every
        other project keeps the classic layout below, built from its
        paragraphs and images. Both end with the same prev/next bar.
      */}
      {project.story ? (
        <main>
          <StoryPage project={project} />
        </main>
      ) : (
      <>
      {/* Hero title */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <TransitionLink
            href="/proyectos"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-violet-300 transition-colors duration-200 label-mono group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
            {t.projects.backLink}
          </TransitionLink>
        </motion.div>
        <motion.p
          className="text-violet-300 label-mono mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h1>

        {/* Case-study metadata. Only renders for projects that have it. */}
        {(meta.length > 0 || (scope && scope.length > 0)) && (
          <motion.div
            className="mt-12 pt-8 border-t border-stone-200/15 flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {meta.length > 0 && (
              <dl className="flex flex-wrap gap-x-14 gap-y-6">
                {meta.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <dt className="text-violet-300 label-mono">
                      {item.label}
                    </dt>
                    <dd className="text-stone-200 text-base font-bold max-w-xs">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {scope && scope.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <span className="text-violet-300 label-mono">
                  {t.projects.scope}
                </span>
                <ul className="flex flex-wrap gap-2">
                  {scope.map((item) => (
                    <li
                      key={item}
                      className="border border-stone-200/25 text-stone-200/80 rounded-full px-3.5 py-1 text-xs font-bold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </section>

      <main>
        {/* Hero image, full bleed */}
        <ProjectHero
          src={project.heroImage}
          media={project.heroMedia}
          alt={`${title}, ${lang === 'en' ? 'cover' : 'portada'}`}
          swipe={project.heroSwipe}
          dotLabel={(i, n) => (lang === 'en' ? `Show part ${i} of ${n}` : `Ver parte ${i} de ${n}`)}
        />

        {/*
          Text and images alternate instead of stacking a wall of copy on top of
          a wall of pictures. Each text block is followed by its share of the
          project images, split as evenly as the count allows.
        */}
        {textBlocks.map((block, blockIndex) => (
          <Fragment key={block.key}>
            <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
              <div className="max-w-3xl mx-auto flex flex-col gap-6">{block.content}</div>
            </section>

            {imageGroups[blockIndex]?.map((image) => (
              <div key={image} className="w-full overflow-hidden">
                <ProtectedImage
                  src={image}
                  alt={`${title}, ${allImages.indexOf(image) + 1}`}
                  sizes="100vw"
                  quality={90}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </Fragment>
        ))}

        {/* Credits, always last. */}
        {credits && credits.length > 0 && (
          <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-16">
            <div className="max-w-3xl mx-auto flex flex-col gap-3 border-t border-indigo-950/10 pt-8">
              <span className="text-violet-500 label-mono">
                {t.projects.credits}
              </span>
              {credits.map((line) => {
                const split = line.indexOf(':');
                const label = split > -1 ? line.slice(0, split) : line;
                const name = split > -1 ? line.slice(split + 1).trim() : '';
                return (
                  <p key={line} className="leading-relaxed">
                    <span className="text-indigo-950/50">{label}</span>
                    {name && <span className="text-indigo-950 font-bold">: {name}</span>}
                  </p>
                );
              })}
            </div>
          </section>
        )}
      </main>
      </>
      )}

      {/* Prev / Next navigation */}
      {(prevProject || nextProject) && (
        <section className="bg-stone-200 border-t border-indigo-950/10 grid grid-cols-1 md:grid-cols-2">
          {prevProject?.slug ? (
            <TransitionLink
              href={`/proyectos/${prevProject.slug}`}
              className="relative flex items-center gap-5 px-6 md:px-16 lg:px-24 py-10 border-b md:border-b-0 md:border-r border-indigo-950/10 group hover:bg-indigo-950/5 transition-colors duration-300 overflow-hidden"
            >
              <div className="relative shrink-0 w-16 h-16 rounded overflow-hidden border border-indigo-950/10">
                <ProtectedImage src={prevProject.thumb} alt={projectTitle(prevProject, lang)} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-violet-500 label-mono flex items-center gap-2 group-hover:-translate-x-1 transition-transform duration-300">
                  {t.projects.prev}
                </span>
                <span className="text-xl md:text-2xl font-black text-indigo-950 leading-tight group-hover:text-violet-900 transition-colors duration-300">
                  {projectTitle(prevProject, lang)}
                </span>
              </div>
            </TransitionLink>
          ) : <div />}

          {nextProject?.slug ? (
            <TransitionLink
              href={`/proyectos/${nextProject.slug}`}
              className="relative flex items-center justify-end gap-5 px-6 md:px-16 lg:px-24 py-10 text-right group hover:bg-indigo-950/5 transition-colors duration-300 overflow-hidden"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="text-violet-500 label-mono flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  {t.projects.next}
                </span>
                <span className="text-xl md:text-2xl font-black text-indigo-950 leading-tight group-hover:text-violet-900 transition-colors duration-300">
                  {projectTitle(nextProject, lang)}
                </span>
              </div>
              <div className="relative shrink-0 w-16 h-16 rounded overflow-hidden border border-indigo-950/10">
                <ProtectedImage src={nextProject.thumb} alt={projectTitle(nextProject, lang)} fill sizes="64px" className="object-cover" />
              </div>
            </TransitionLink>
          ) : <div />}
        </section>
      )}

      <QuoteBanner />
      <Footer />
    </div>
  );
};
