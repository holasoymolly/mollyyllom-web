/**
 * A project's title in the reader's language. Lives apart from
 * `src/projects.tsx` so client components can use it without pulling every
 * case's data (all 41 cases and their stories) into the browser bundle.
 */
export const projectTitle = (project: { title: string; titleEn?: string }, lang: 'es' | 'en'): string =>
  lang === 'en' ? project.titleEn ?? project.title : project.title;
