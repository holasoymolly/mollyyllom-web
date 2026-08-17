'use client';

import { FC, Fragment, ReactNode, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TransitionLink } from '@/components/TransitionLink';
import { projectsBySlug, activeProjects } from '../../projects';
import { QuoteBanner } from '@/components/QuoteBanner';
import { ProtectedImage } from '@/components/ProtectedImage';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { trackProjectViewed } from '@/lib/analytics';

interface ProjectPageProps {
  slug: string;
}

export const ProjectPage: FC<ProjectPageProps> = ({ slug }) => {
  const project = projectsBySlug[slug];
  const projectIndex = activeProjects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? activeProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < activeProjects.length - 1 ? activeProjects[projectIndex + 1] : null;
  const { lang, t } = useLanguage();

  const paragraphs = lang === 'en' ? project?.paragraphsEn : project?.paragraphs;
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
          <span className="text-violet-500 text-[10px] font-bold tracking-[0.25em] uppercase">
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
    textBlocks.push({
      key: 'delivery',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {shipped && shipped.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-violet-500 text-[10px] font-bold tracking-[0.25em] uppercase">
                {t.projects.shipped}
              </span>
              <ul className="flex flex-col gap-3">
                {shipped.map((item) => (
                  <li key={item} className="text-indigo-950/70 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {outcome && outcome.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-violet-500 text-[10px] font-bold tracking-[0.25em] uppercase">
                {t.projects.outcome}
              </span>
              <ul className="flex flex-col gap-3">
                {outcome.map((item) => (
                  <li key={item} className="text-indigo-950 font-bold leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
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
  const allImages = project?.images ?? [];
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
    project?.client && { label: t.projects.client, value: project.client },
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
            className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors duration-200 text-xs font-bold tracking-[0.2em] uppercase group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
            {t.projects.backLink}
          </TransitionLink>
        </motion.div>
        <motion.p
          className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {String(projectIndex + 1).padStart(2, '0')} / {String(activeProjects.length).padStart(2, '0')}
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {project.title}
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
                    <dt className="text-violet-400 text-[10px] font-bold tracking-[0.25em] uppercase">
                      {item.label}
                    </dt>
                    <dd className="text-stone-200 text-base font-bold max-w-xs">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {scope && scope.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <span className="text-violet-400 text-[10px] font-bold tracking-[0.25em] uppercase">
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
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <ProtectedImage
            src={project.heroImage}
            alt={`${project.title} Hero`}
            fill
            sizes="100vw"
            quality={90}
            priority
            className="object-cover"
          />
        </div>

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
                  alt={`${project.title}, ${project.images.indexOf(image) + 1}`}
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
              <span className="text-violet-500 text-[10px] font-bold tracking-[0.25em] uppercase">
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

      {/* Prev / Next navigation */}
      {(prevProject || nextProject) && (
        <section className="bg-stone-200 border-t border-indigo-950/10 grid grid-cols-1 md:grid-cols-2">
          {prevProject?.slug ? (
            <TransitionLink
              href={`/proyectos/${prevProject.slug}`}
              className="relative flex items-center gap-5 px-6 md:px-16 lg:px-24 py-10 border-b md:border-b-0 md:border-r border-indigo-950/10 group hover:bg-indigo-950/5 transition-colors duration-300 overflow-hidden"
            >
              <div className="relative shrink-0 w-16 h-16 rounded overflow-hidden border border-indigo-950/10">
                <ProtectedImage src={prevProject.portfolioImage} alt={prevProject.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-2 group-hover:-translate-x-1 transition-transform duration-300">
                  {t.projects.prev}
                </span>
                <span className="text-xl md:text-2xl font-black text-indigo-950 leading-tight group-hover:text-violet-900 transition-colors duration-300">
                  {prevProject.title}
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
                <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  {t.projects.next}
                </span>
                <span className="text-xl md:text-2xl font-black text-indigo-950 leading-tight group-hover:text-violet-900 transition-colors duration-300">
                  {nextProject.title}
                </span>
              </div>
              <div className="relative shrink-0 w-16 h-16 rounded overflow-hidden border border-indigo-950/10">
                <ProtectedImage src={nextProject.portfolioImage} alt={nextProject.title} fill sizes="64px" className="object-cover" />
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
