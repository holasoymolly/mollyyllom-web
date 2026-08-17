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
      title: "Project not found | MOLLY YLLOM",
      description: "The project you are looking for does not exist.",
    };
  }

  const description =
    (project.paragraphsEn[0] ? metaDescription(project.paragraphsEn[0]) : undefined) ??
    "Branding and visual identity project.";

  return {
    title: `${project.title} | MOLLY YLLOM`,
    description,
    alternates: {
      canonical: `/en/proyectos/${project.slug}`,
      languages: languageAlternates(`/proyectos/${project.slug}`),
    },
    openGraph: {
      title: `${project.title} | MOLLY YLLOM`,
      description,
      url: `/en/proyectos/${project.slug}`,
      images: [
        {
          url: project.heroImage,
          alt: `${project.title} | MOLLY YLLOM`,
        },
      ],
      locale: "en_US",
      alternateLocale: "es_ES",
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <ProjectPage slug={slug} />;
}
