import type { Metadata } from "next";
import { PostPage } from "@/pageComponents/PostPage";
import { activePosts, postsBySlug } from "@/posts";
import { languageAlternates, metaDescription } from "@/i18n/metadata";

export async function generateStaticParams() {
  return activePosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = postsBySlug[slug];

  if (!post) {
    return {
      title: "Entrada no encontrada | MOLLY YLLOM",
      description: "La entrada que buscas no existe.",
    };
  }

  const description = metaDescription(post.excerpt);

  return {
    title: `${post.title} | MOLLY YLLOM`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: languageAlternates(`/blog/${post.slug}`),
    },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      title: `${post.title} | MOLLY YLLOM`,
      description,
      url: `/blog/${post.slug}`,
      ...(post.coverImage
        ? { images: [{ url: post.coverImage, alt: `${post.title} | MOLLY YLLOM` }] }
        : {}),
      locale: "es_ES",
      alternateLocale: "en_US",
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <PostPage slug={slug} />;
}
