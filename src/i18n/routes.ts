import type { Language } from './translations';

/**
 * The site is Spanish at the bare path and English under `/en`. Both languages
 * therefore have real, crawlable, shareable URLs, which is what lets each one
 * carry its own title, description and OG tags: metadata is resolved on the
 * server, so it can only ever describe one language per URL.
 */
export const EN_PREFIX = '/en';

/**
 * Route roots that exist in both languages.
 *
 * `/cv/**` is deliberately absent. The CV pages already carry their language in
 * the URL (`/cv` vs `/cv/es`) and have their own toggle, so prefixing them would
 * point at routes that do not exist.
 */
const LOCALIZED_ROOTS = ['/conoceme', '/proyectos', '/contacto', '/descargas'];

/** Split an href into its path and whatever query string or hash follows it. */
function splitPath(href: string): [string, string] {
  const cut = href.search(/[?#]/);
  return cut === -1 ? [href, ''] : [href.slice(0, cut), href.slice(cut)];
}

function isLocalizedPath(path: string): boolean {
  if (path === '/') return true;
  return LOCALIZED_ROOTS.some((root) => path === root || path.startsWith(`${root}/`));
}

/**
 * The language a pathname resolves to. The URL is the single source of truth,
 * so the copy on screen always matches the metadata the crawler was served.
 */
export function langFromPathname(pathname: string): Language {
  const [path] = splitPath(pathname);
  return path === EN_PREFIX || path.startsWith(`${EN_PREFIX}/`) ? 'en' : 'es';
}

/** Drop the `/en` prefix, giving the canonical Spanish path. */
export function stripLocale(pathname: string): string {
  const [path, rest] = splitPath(pathname);
  if (path === EN_PREFIX) return `/${rest}`;
  if (path.startsWith(`${EN_PREFIX}/`)) return `${path.slice(EN_PREFIX.length)}${rest}`;
  return `${path}${rest}`;
}

/**
 * Add the locale prefix to an internal href when the reader is in English.
 *
 * This only ever adds. An href that already names its language, such as the CV
 * back links, is left exactly as written, so a component can still opt out by
 * being explicit.
 */
export function withLocale(href: string, lang: Language): string {
  if (lang !== 'en') return href;
  const [path, rest] = splitPath(href);
  if (!isLocalizedPath(path) || langFromPathname(path) === 'en') return href;
  return path === '/' ? `${EN_PREFIX}${rest}` : `${EN_PREFIX}${path}${rest}`;
}

/**
 * The equivalent of `pathname` in `lang`, in either direction. Used by the
 * language toggle, which is the one place that has to be able to strip as well
 * as add, so toggling keeps the reader on the page they were already on.
 */
export function localizePath(pathname: string, lang: Language): string {
  const bare = stripLocale(pathname);
  return lang === 'en' ? withLocale(bare, 'en') : bare;
}
