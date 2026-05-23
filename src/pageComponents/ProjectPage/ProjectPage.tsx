'use client';

import { FC } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TransitionLink } from '@/components/TransitionLink';
import { projectsBySlug, activeProjects } from '../../projects';
import { QuoteBanner } from '@/components/QuoteBanner';
import { ProtectedImage } from '@/components/ProtectedImage';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

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
      </section>

      <main>
        {/* Hero image — full bleed */}
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <ProtectedImage
            src={project.heroImage}
            alt={`${project.title} Hero`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Body text */}
        {paragraphs && paragraphs.length > 0 && (
          <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
            <div className="max-w-3xl flex flex-col gap-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0
                    ? "text-2xl md:text-3xl font-black text-indigo-950 leading-snug"
                    : "text-lg text-indigo-950/70 leading-relaxed"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Project images — full bleed */}
        <section>
          {project.images.map((image, index) => (
            <div key={index} className="w-full overflow-hidden">
              <ProtectedImage
                src={image}
                alt={`${project.title} — ${index + 1}`}
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          ))}
        </section>
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
