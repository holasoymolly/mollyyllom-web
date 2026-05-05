'use client';

import { activeProjects } from "@/projects";
import { TransitionLink } from "@/components/TransitionLink";
import { ProtectedImage } from "@/components/ProtectedImage";
import { useLanguage } from "@/context/LanguageContext";

export const PortfolioGrid = ({ showHeader = true }: { showHeader?: boolean }) => {
  const { t } = useLanguage();

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
      <div className="grid grid-cols-2 md:grid-cols-3">
        {activeProjects.map((item, index) => {
          const inner = (
            <>
              <div className="overflow-hidden aspect-square">
                <ProtectedImage
                  src={item.portfolioImage}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              {/* Slide-up title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] h-2/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-[cubic-bezier(0.33,1,0.68,1)] pointer-events-none">
                <p className="text-violet-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  {t.portfolio.brandingLabel}
                </p>
                <span className="text-stone-200 font-bold text-sm md:text-base lg:text-lg leading-tight">
                  {item.title}
                </span>
              </div>
            </>
          );

          const className = `relative overflow-hidden group cursor-pointer`;

          if (item.slug) {
            return (
              <TransitionLink key={index} href={`/proyectos/${item.slug}`} className={className}>
                {inner}
              </TransitionLink>
            );
          }

          return (
            <figure key={index} className={className}>
              {inner}
            </figure>
          );
        })}
      </div>
    </section>
  );
};
