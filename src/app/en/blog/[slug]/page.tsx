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
      title: "Entry not found | MOLLY YLLOM",
      description: "The entry you are looking for does not exist.",
    };
  }

  const description = metaDescription(post.excerptEn);

  return {
    title: `${post.titleEn} | MOLLY YLLOM`,
    description,
    alternates: {
      canonical: `/en/blog/${post.slug}`,
      languages: languageAlternates(`/blog/${post.slug}`),
    },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      title: `${post.titleEn} | MOLLY YLLOM`,
      description,
      url: `/en/blog/${post.slug}`,
      ...(post.coverImage
        ? { images: [{ url: post.coverImage, alt: `${post.titleEn} | MOLLY YLLOM` }] }
        : {}),
      locale: "en_US",
      alternateLocale: "es_ES",
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <PostPage slug={slug} />;
}
