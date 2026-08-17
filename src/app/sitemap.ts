import type { MetadataRoute } from "next";
import { activeProjects } from "@/projects";
import { EN_PREFIX } from "@/i18n/routes";

const SITE_URL = "https://www.mollyyllom.com";

/**
 * One entry per language, each declaring the pair so a crawler that lands on
 * either one knows the other exists. `path` is always the Spanish route: the
 * English URL is the same path under `/en`.
 */
function bilingualEntry(
  path: string,
  rest: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">
): MetadataRoute.Sitemap {
  const esPath = path === "/" ? "" : path;
  const languages = {
    es: `${SITE_URL}${esPath || "/"}`,
    en: `${SITE_URL}${EN_PREFIX}${esPath}`,
  };
  return [
    { url: languages.es, ...rest, alternates: { languages } },
    { url: languages.en, ...rest, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const bilingualRoutes: MetadataRoute.Sitemap = [
    ...bilingualEntry("/",          { changeFrequency: "monthly", priority: 1.0, lastModified: now }),
    ...bilingualEntry("/conoceme",  { changeFrequency: "yearly",  priority: 0.7, lastModified: now }),
    ...bilingualEntry("/proyectos", { changeFrequency: "monthly", priority: 0.9, lastModified: now }),
    ...bilingualEntry("/contacto",  { changeFrequency: "yearly",  priority: 0.6, lastModified: now }),
    ...bilingualEntry("/descargas", { changeFrequency: "yearly",  priority: 0.5, lastModified: now }),
  ];

  // The CVs already carry their language in the URL, so they pair with each
  // other rather than with an /en twin.
  const cvRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/cv`,         changeFrequency: "monthly", priority: 0.4, lastModified: now, alternates: { languages: { en: `${SITE_URL}/cv`, es: `${SITE_URL}/cv/es` } } },
    { url: `${SITE_URL}/cv/es`,      changeFrequency: "monthly", priority: 0.4, lastModified: now, alternates: { languages: { en: `${SITE_URL}/cv`, es: `${SITE_URL}/cv/es` } } },
    { url: `${SITE_URL}/cv/web3`,    changeFrequency: "monthly", priority: 0.4, lastModified: now, alternates: { languages: { en: `${SITE_URL}/cv/web3`, es: `${SITE_URL}/cv/es/web3` } } },
    { url: `${SITE_URL}/cv/es/web3`, changeFrequency: "monthly", priority: 0.4, lastModified: now, alternates: { languages: { en: `${SITE_URL}/cv/web3`, es: `${SITE_URL}/cv/es/web3` } } },
  ];

  const projectRoutes: MetadataRoute.Sitemap = activeProjects
    .filter((p) => p.slug)
    .flatMap((p) =>
      bilingualEntry(`/proyectos/${p.slug}`, {
        changeFrequency: "yearly",
        priority: 0.7,
        lastModified: now,
      })
    );

  return [...bilingualRoutes, ...cvRoutes, ...projectRoutes];
}
