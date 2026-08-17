import { EN_PREFIX } from './routes';

/** Google shows roughly this much of a description before cutting it off. */
const MAX_DESCRIPTION = 160;

/**
 * Trim a paragraph down to a search snippet without slicing a word in half.
 *
 * A hard `slice(0, 160)` left descriptions ending mid-phrase ("built on simple
 * shapes, "), which is what a searcher sees. Prefer the last sentence that
 * fits; fall back to the last whole word.
 */
export function metaDescription(text: string): string {
  const clean = text.trim();
  if (clean.length <= MAX_DESCRIPTION) return clean;

  const window = clean.slice(0, MAX_DESCRIPTION);
  const sentenceEnd = Math.max(window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '));
  if (sentenceEnd >= MAX_DESCRIPTION / 2) return window.slice(0, sentenceEnd + 1);

  const wordEnd = window.lastIndexOf(' ');
  return `${window.slice(0, wordEnd > 0 ? wordEnd : MAX_DESCRIPTION).replace(/[,;:.\s]+$/, '')}…`;
}

/**
 * The hreflang map for one page, keyed by the Spanish path.
 *
 * Google only honours an alternate when both URLs point at each other, so the
 * Spanish route and its English twin declare the identical map and differ only
 * in which one they call canonical. `x-default` sends anyone the crawler cannot
 * place to the Spanish page, which is the site's primary language.
 */
export function languageAlternates(esPath: string) {
  return {
    es: esPath,
    en: esPath === '/' ? EN_PREFIX : `${EN_PREFIX}${esPath}`,
    'x-default': esPath,
  };
}
