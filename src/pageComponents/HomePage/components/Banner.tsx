'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/Button";
import { useLanguage } from '@/context/LanguageContext';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export const Banner = () => {
  const { t } = useLanguage();
  // Headline copy uses '\n' for line breaks. The third line is highlighted
  // in violet and may optionally have a trailing tail piece on the same row.
  const lines = t.home.headline.split('\n');
  const lead = lines.slice(0, 2);
  const highlight = lines[2] ?? '';
  const trailing = lines.slice(3).join(' ');

  return (
    <section className="bg-indigo-950 text-stone-200 min-h-[75vh] sm:min-h-[88vh] flex flex-col justify-between px-6 sm:px-10 md:px-16 lg:px-24 pt-14 md:pt-20 pb-8 sm:pb-12">
      <div>
        <motion.p
          className="text-violet-400 text-xs font-semibold tracking-[0.3em] uppercase mb-8"
          {...fadeUp(0.15)}
        >
          {t.home.studioLabel}
        </motion.p>

        <motion.h1
          className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] font-black leading-[0.9] tracking-tight"
          {...fadeUp(0.3)}
        >
          {lead.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          <span className="text-violet-400">{highlight}</span>
          {trailing && ` ${trailing}`}
        </motion.h1>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-16 border-t border-stone-200/20 pt-8">
        <motion.p
          className="text-slate-300 text-base md:text-lg max-w-sm leading-relaxed"
          {...fadeUp(0.5)}
        >
          {t.home.subheadline}
        </motion.p>
        <div className="flex items-center gap-6">
          <motion.div
            className="sm:hidden"
            {...fadeUp(0.65)}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-slate-400"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
          <motion.div {...fadeUp(0.6)}>
            <Button href={t.quoteBanner.url} text={t.home.cta} size="large" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
