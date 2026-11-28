/**
 * Server-side slices of the project data, so client components receive only
 * what they render instead of importing `src/projects.tsx` (which, imported
 * from a client component, ships every case's copy and story to every page:
 * about 80 KB compressed). Import this module only from server components
 * (route `page.tsx` files and server-rendered page parts).
 */
import { activeProjects, homeProjects, type Project } from '@/projects';
import { getImageDimensions } from '@/lib/imageDimensions';

/** What a grid tile needs. */
export type GridItem = Pick<Project, 'slug' | 'title' | 'titleEn' | 'gridLabel' | 'gridLabelEn' | 'portfolioImage' | 'year'>;

/** What the prev/next bar of a case needs. */
export type NavItem = { slug: string; title: string; titleEn?: string; thumb: string };

const gridItem = (p: Project): GridItem => ({
  slug: p.slug,
  title: p.title,
  titleEn: p.titleEn,
  gridLabel: p.gridLabel,
  gridLabelEn: p.gridLabelEn,
  portfolioImage: p.portfolioImage,
  year: p.year,
});

/** Every project, in `activeProjects` order (/proyectos). */
export const allGridItems = (): GridItem[] => activeProjects.map(gridItem);

/** The home grid: the first `limit` of `homeProjects`, in its own order. */
export const homeGridItems = (limit: number): GridItem[] => homeProjects.slice(0, limit).map(gridItem);

/** The cases shown on /empresas, in this order. */
const BUSINESS_CASES = ['canteras-del-tropico', 'bh-mobiliario', 'alliance', 'aerosol'];
export const businessGridItems = (): GridItem[] =>
  BUSINESS_CASES.map((slug) => activeProjects.find((p) => p.slug === slug)).filter(Boolean).map((p) => gridItem(p!));

const VIDEO = /\.(mp4|webm|mov)$/i;

/**
 * A still for the prev/next thumbnails: the grid tile when it is an image,
 * its poster when the tile is a video, and the cover as the last resort.
 * Never a video's first frame.
 */
const thumbFor = (p: Project): string => {
  if (!VIDEO.test(p.portfolioImage)) return p.portfolioImage;
  const poster = p.portfolioImage.replace(VIDEO, '-poster.webp');
  return getImageDimensions(poster) ? poster : p.heroImage;
};

const navItem = (p: Project): NavItem => ({ slug: p.slug, title: p.title, titleEn: p.titleEn, thumb: thumbFor(p) });

/** Everything a case page needs besides its own project. */
export const caseNeighbours = (slug: string) => {
  const i = activeProjects.findIndex((p) => p.slug === slug);
  return {
    position: i + 1,
    total: activeProjects.length,
    prev: i > 0 ? navItem(activeProjects[i - 1]) : null,
    next: i >= 0 && i < activeProjects.length - 1 ? navItem(activeProjects[i + 1]) : null,
  };
};
