'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/Button";
import { ProtectedImage } from "@/components/ProtectedImage";
import { useLanguage } from '@/context/LanguageContext';
import { trackBookingCTAClicked } from '@/lib/analytics';

export const MediaSection = () => {
  const { lang, t } = useLanguage();
  const readyLines = t.home.readyHeadline.split('\n');

  const stats = [
    { value: '20+', label: t.home.stat1 },
    { value: '300+', label: t.home.stat2 },
    { value: '∞', label: t.home.stat3 },
  ];

  return (
    <section className="flex flex-col md:flex-row md:h-[680px]">
      {/* Photo — left half */}
      <figure className="w-full md:w-1/2 h-56 md:h-auto overflow-hidden shrink-0">
        <ProtectedImage
          src="/img/molly/molly1.webp"
          alt="Molly Yllom"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          priority
          className="object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
      </figure>

      {/* Dark panel — right half */}
      <div className="w-full md:w-1/2 bg-indigo-950 text-stone-200 flex flex-col justify-between p-8 md:p-10 lg:p-14">
        <motion.p
          className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.home.studioSection}
        </motion.p>

        <div className="flex flex-col gap-6 my-8 md:my-0">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {readyLines[0]}<br />
            {readyLines[1]}<br />
            <span className="text-violet-400">{t.home.readyHighlight}</span>
          </motion.h2>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 border-t border-stone-200/10 pt-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-black text-violet-400 leading-none">{s.value}</p>
                <p className="text-slate-400 text-xs leading-snug mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button
            href="https://calendly.com/hola-msny/30min"
            text={t.home.bookCta}
            size="large"
            onClick={() => trackBookingCTAClicked('home', lang)}
          />
        </motion.div>
      </div>
    </section>
  );
};
