import type { Language } from '@/i18n/translations';

/**
 * A blog entry, in both languages.
 *
 * Her site is the original and LinkedIn is the megaphone: she writes the long
 * version here and posts a short, linked version there. Syncing the other way
 * round is not possible without scraping LinkedIn, which would put her account
 * at risk, so nothing here is ever fetched from anywhere.
 *
 * Both languages are required fields, not optional ones, so `tsc` fails on an
 * entry that only exists in Spanish. Each version is written, never machine
 * translated: her voice in Spanish is not her voice in English, and a reflective
 * piece run through a translator loses exactly the human note the blog is for.
 */
export interface Post {
  slug: string;
  /**
   * `YYYY-MM-DD`, the day it was first published. Drives the ordering of the
   * whole section, so nothing has to be reordered by hand.
   */
  date: string;
  title: string;
  titleEn: string;
  /** One or two sentences. Feeds the listing card and the meta description. */
  excerpt: string;
  excerptEn: string;
  /** The body, one string per paragraph. The first one renders as the lead. */
  paragraphs: string[];
  paragraphsEn: string[];
  /** Optional kicker above the title, e.g. "Marca" / "Brand". */
  topic?: string;
  topicEn?: string;
  /** The LinkedIn post this started life as, credited at the foot of the entry. */
  linkedinUrl?: string;
  /** Optional OG image. Without one the entry falls back to the site default. */
  coverImage?: string;
}

/**
 * Every entry. Order does not matter here: `activePosts` sorts by date, so a
 * new entry can be appended wherever it is convenient to write it.
 */
const posts: Post[] = [];

/** Newest first, everywhere: the listing, the sitemap and the prev/next links. */
export const activePosts: Post[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const postsBySlug: Record<string, Post> = Object.fromEntries(
  activePosts.map((post) => [post.slug, post])
);

/**
 * The date as a reader sees it. Parsed and formatted in UTC so the server and
 * the browser always agree, which a local-timezone parse would not guarantee.
 */
export function formatPostDate(date: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-DO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

const WORDS_PER_MINUTE = 200;

/** Rounded reading time in minutes, never less than one. */
export function readingMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
