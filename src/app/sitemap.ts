import type { MetadataRoute } from "next";
import { activeProjects } from "@/projects";

const SITE_URL = "https://www.mollyyllom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          changeFrequency: "monthly", priority: 1.0,  lastModified: now },
    { url: `${SITE_URL}/conoceme`,  changeFrequency: "yearly",  priority: 0.7,  lastModified: now },
    { url: `${SITE_URL}/proyectos`, changeFrequency: "monthly", priority: 0.9,  lastModified: now },
    { url: `${SITE_URL}/contacto`,  changeFrequency: "yearly",  priority: 0.6,  lastModified: now },
    { url: `${SITE_URL}/descargas`, changeFrequency: "yearly",  priority: 0.5,  lastModified: now },
    { url: `${SITE_URL}/cv`,        changeFrequency: "monthly", priority: 0.4,  lastModified: now },
    { url: `${SITE_URL}/cv/es`,     changeFrequency: "monthly", priority: 0.4,  lastModified: now },
    { url: `${SITE_URL}/cv/web3`,   changeFrequency: "monthly", priority: 0.4,  lastModified: now },
    { url: `${SITE_URL}/cv/es/web3`,changeFrequency: "monthly", priority: 0.4,  lastModified: now },
  ];

  const projectRoutes: MetadataRoute.Sitemap = activeProjects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/proyectos/${p.slug}`,
      changeFrequency: "yearly",
      priority: 0.7,
      lastModified: now,
    }));

  return [...staticRoutes, ...projectRoutes];
}
