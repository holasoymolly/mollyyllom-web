'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { QuoteBanner } from "@/components/QuoteBanner";
import { FC } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { GridItem } from "@/lib/projectSlices";

export const ProjectsPage: FC<{ items: GridItem[] }> = ({ items }) => {
  const { t } = useLanguage();

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
          {t.projects.label}
        </motion.p>
        <motion.h1
          className="text-[clamp(2.5rem,14vw,3.75rem)] sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.projects.title}
        </motion.h1>
        <motion.p
          className="text-slate-300 text-lg leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.projects.subtitle}
        </motion.p>
      </section>

      <PortfolioGrid items={items} showHeader={false} />

      <QuoteBanner />
      <Footer />
    </div>
  );
};
