'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
      <motion.h2
        className="text-4xl md:text-5xl font-black text-indigo-950"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {t.home.capabilitiesTitle}
      </motion.h2>

      <div className="mt-10 border-t border-indigo-950/10">
        {t.home.services.map((service, index) => (
          <motion.div
            key={index}
            className="grid grid-cols-[2rem_1fr] md:grid-cols-[2rem_1fr_2fr] gap-x-8 gap-y-1 items-start py-8 border-b border-indigo-950/10 group cursor-default"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-violet-500 label-mono pt-1.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-indigo-950 group-hover:text-violet-900 transition-colors duration-300 leading-snug">
              {service.title}
            </h3>
            <p className="col-start-2 md:col-start-3 text-indigo-950/55 text-sm md:text-base leading-relaxed md:pt-0.5">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
