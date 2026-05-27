'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteBanner } from "@/components/QuoteBanner";
import { ProtectedImage } from "@/components/ProtectedImage";
import { FC } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export const ConocemePage: FC = () => {
  const { t } = useLanguage();
  const ctaLines = t.about.ctaHeadline.split('\n');

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-24">
        <motion.p
          className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.about.label}
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.about.title}
        </motion.h1>
        <motion.p
          className="text-slate-300 text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.about.bio}
        </motion.p>
      </section>

      {/* Photo + panel */}
      <section className="flex flex-col md:flex-row md:h-[580px]">
        <figure className="w-full md:w-1/2 h-72 md:h-full overflow-hidden shrink-0">
          <ProtectedImage
            src="/img/molly/molly2.webp"
            alt="Molly Yllom"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            quality={90}
            priority
            className="object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
        </figure>

        <div className="w-full md:w-1/2 bg-stone-200 flex flex-col justify-center px-8 py-14 md:px-14 lg:px-20 gap-6">
          <motion.p
            className="text-violet-500 text-xs font-bold tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t.about.ctaLabel}
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo-950 leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {ctaLines[0]}<br />
            {ctaLines[1]}<br />
            <span className="text-violet-500">{t.about.ctaHighlight}</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a
              href="https://calendly.com/hola-msny/30min"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block bg-indigo-950 text-stone-200 font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-violet-500 hover:text-stone-200"
            >
              {t.about.ctaButton}
            </a>
          </motion.div>
        </div>
      </section>

      <QuoteBanner />
      <Footer />
    </div>
  );
};
