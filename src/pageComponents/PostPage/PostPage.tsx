'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteBanner } from '@/components/QuoteBanner';
import { TransitionLink } from '@/components/TransitionLink';
import { useLanguage } from '@/context/LanguageContext';
import { activePosts, formatPostDate, postsBySlug, readingMinutes } from '@/posts';
import { trackArticleViewed } from '@/lib/analytics';

/**
 * Links inside a paragraph, written the Markdown way: `[the IBM article](https://…)`.
 * Only external links, so a plain anchor that opens in a new tab, never
 * TransitionLink. Everything else in the paragraph stays plain text.
 */
const INLINE_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <a
        key={start}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-500 underline underline-offset-4 decoration-violet-500/40 hover:text-violet-600 hover:decoration-violet-600 transition-colors duration-200"
      >
        {match[1]}
      </a>
    );
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

interface PostPageProps {
  slug: string;
}

export const PostPage: FC<PostPageProps> = ({ slug }) => {
  const { lang, t } = useLanguage();
  const post = postsBySlug[slug];

  // Newest first, so the entry before this one in the array is the newer one.
  const index = activePosts.findIndex((p) => p.slug === slug);
  const newerPost = index > 0 ? activePosts[index - 1] : null;
  const olderPost = index > -1 && index < activePosts.length - 1 ? activePosts[index + 1] : null;

  // Fire once per entry. `lang` is read through a ref so toggling the language
  // mid-read doesn't count as a second view, matching Project Viewed.
  const langRef = useRef(lang);
  langRef.current = lang;
  useEffect(() => {
    if (!post) return;
    trackArticleViewed(post.slug, post.title, langRef.current);
  }, [post]);

  if (!post) {
    return (
      <div>
        <Header />
        <main className="flex flex-col justify-center items-center h-[80vh] text-center px-6">
          <h1 className="text-5xl font-black text-indigo-950">{t.blog.notFound}</h1>
          <p className="text-indigo-950/60 mt-4">{t.blog.notFoundSub}</p>
          <TransitionLink
            href="/blog"
            className="mt-8 bg-indigo-950 text-stone-200 font-bold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-violet-500"
          >
            {t.blog.viewAll}
          </TransitionLink>
        </main>
        <Footer />
      </div>
    );
  }

  const title = lang === 'en' ? post.titleEn : post.title;
  const topic = lang === 'en' ? post.topicEn ?? post.topic : post.topic;
  const paragraphs = lang === 'en' ? post.paragraphsEn : post.paragraphs;
  const [lead, ...body] = paragraphs;

  return (
    <div>
      <Header />

      {/* Hero title */}
      <section className="bg-indigo-950 text-stone-200 px-6 md:px-16 lg:px-24 pt-20 pb-24">
        {/* Same column as the article body below, so the title and the text
            share one left edge instead of the title hugging the page padding. */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6"
          >
            <TransitionLink
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors duration-200 text-xs font-bold tracking-[0.2em] uppercase group"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
              {t.blog.backLink}
            </TransitionLink>
          </motion.div>

          {topic && (
            <motion.p
              className="text-violet-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {topic}
            </motion.p>
          )}

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {title}
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
            <span className="text-stone-200/20">·</span>
            <span>
              {readingMinutes(paragraphs)} {t.blog.readingTime}
            </span>
          </motion.div>
        </div>
      </section>

      <main>
        <article className="bg-stone-200 px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {lead && (
              <p className="text-2xl md:text-3xl font-black text-indigo-950 leading-snug">{renderInline(lead)}</p>
            )}
            {body.map((paragraph) => (
              // `whitespace-pre-line` so a paragraph holding a list keeps its
              // line breaks, which is how her posts are actually written.
              <p key={paragraph} className="text-lg text-indigo-950/70 leading-relaxed whitespace-pre-line">
                {renderInline(paragraph)}
              </p>
            ))}

            {/* The LinkedIn original, credited rather than hidden. External, so
                a plain anchor and not TransitionLink. */}
            {post.linkedinUrl && (
              <a
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-8 border-t border-indigo-950/10 text-violet-500 text-xs font-bold tracking-[0.25em] uppercase hover:text-violet-600 transition-colors duration-200"
              >
                {t.blog.originalPost}
              </a>
            )}
          </div>
        </article>
      </main>

      {/* Prev / Next */}
      {(newerPost || olderPost) && (
        <section className="bg-stone-200 border-t border-indigo-950/10 grid grid-cols-1 md:grid-cols-2">
          {newerPost ? (
            <TransitionLink
              href={`/blog/${newerPost.slug}`}
              className="flex flex-col gap-1 px-6 md:px-16 lg:px-24 py-10 border-b md:border-b-0 md:border-r border-indigo-950/10 group hover:bg-indigo-950/5 transition-colors duration-300"
            >
              <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase group-hover:-translate-x-1 transition-transform duration-300">
                {t.blog.prev}
              </span>
              <span className="text-xl md:text-2xl font-black text-indigo-950 leading-tight group-hover:text-violet-900 transition-colors duration-300">
                {lang === 'en' ? newerPost.titleEn : newerPost.title}
              </span>
            </TransitionLink>
          ) : (
            <div />
          )}

          {olderPost ? (
            <TransitionLink
              href={`/blog/${olderPost.slug}`}
              className="flex flex-col gap-1 items-end text-right px-6 md:px-16 lg:px-24 py-10 group hover:bg-indigo-950/5 transition-colors duration-300"
            >
              <span className="text-violet-500 text-xs font-bold tracking-[0.25em] uppercase group-hover:translate-x-1 transition-transform duration-300">
                {t.blog.next}
              </span>
              <span className="text-xl md:text-2xl font-black text-indigo-950 leading-tight group-hover:text-violet-900 transition-colors duration-300">
                {lang === 'en' ? olderPost.titleEn : olderPost.title}
              </span>
            </TransitionLink>
          ) : (
            <div />
          )}
        </section>
      )}

      <QuoteBanner />
      <Footer />
    </div>
  );
};
