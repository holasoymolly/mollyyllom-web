'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteBanner } from '@/components/QuoteBanner';
import { TransitionLink } from '@/components/TransitionLink';
import { useLanguage } from '@/context/LanguageContext';
import { activePosts, formatPostDate, readingMinutes } from '@/posts';

export const BlogPage: FC = () => {
  const { lang, t } = useLanguage();

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
          {t.blog.label}
        </motion.p>
        <motion.h1
          className="text-[clamp(2.5rem,14vw,3.75rem)] sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.blog.title}
        </motion.h1>
        <motion.p
          className="text-slate-300 text-lg leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t.blog.subtitle}
        </motion.p>
      </section>

      <main className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto">
          {activePosts.length === 0 ? (
            <p className="text-lg text-indigo-950/60 leading-relaxed">{t.blog.empty}</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {activePosts.map((post, i) => {
                const title = lang === 'en' ? post.titleEn : post.title;
                const excerpt = lang === 'en' ? post.excerptEn : post.excerpt;
                const topic = lang === 'en' ? post.topicEn ?? post.topic : post.topic;
                const minutes = readingMinutes(lang === 'en' ? post.paragraphsEn : post.paragraphs);

                return (
                  <motion.li
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <TransitionLink
                      href={`/blog/${post.slug}`}
                      className="block bg-white rounded-2xl border border-stone-200 p-6 md:p-8 transition-colors duration-300 hover:border-violet-500/40 group"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-[10px] font-bold tracking-[0.25em] uppercase">
                        {topic && <span className="text-violet-500">{topic}</span>}
                        {topic && <span className="text-indigo-950/20">·</span>}
                        <span className="text-indigo-950/40">{formatPostDate(post.date, lang)}</span>
                        <span className="text-indigo-950/20">·</span>
                        <span className="text-indigo-950/40">
                          {minutes} {t.blog.readingTime}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-indigo-950 leading-tight mb-3 group-hover:text-violet-900 transition-colors duration-300">
                        {title}
                      </h2>

                      <p className="text-lg text-indigo-950/70 leading-relaxed mb-5">{excerpt}</p>

                      <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase inline-flex items-center gap-2">
                        {t.blog.readCta}
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </TransitionLink>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </main>

      <QuoteBanner />
      <Footer />
    </div>
  );
};
