import type { Metadata } from "next";
import { ProjectPage } from "@/pageComponents/ProjectPage";
import { activeProjects, projectsBySlug } from "@/projects";
import { languageAlternates, metaDescription } from "@/i18n/metadata";

export async function generateStaticParams() {
  return activeProjects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectsBySlug[slug];

  if (!project) {
    return {
      title: "Proyecto no encontrado | MOLLY YLLOM",
      description: "El proyecto que buscas no existe.",
    };
  }

  const description =
    (project.paragraphs[0] ? metaDescription(project.paragraphs[0]) : undefined) ??
    "Proyecto de branding e identidad visual.";

  return {
    title: `${project.title} | MOLLY YLLOM`,
    description,
    alternates: {
      canonical: `/proyectos/${project.slug}`,
      languages: languageAlternates(`/proyectos/${project.slug}`),
    },
    openGraph: {
      title: `${project.title} | MOLLY YLLOM`,
      description,
      url: `/proyectos/${project.slug}`,
      images: [
        {
          url: project.heroImage,
          alt: `${project.title} | MOLLY YLLOM`,
        },
      ],
      locale: "es_ES",
      alternateLocale: "en_US",
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <ProjectPage slug={slug} />;
}
