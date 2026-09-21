import type { Metadata } from "next";
import { BlogPage } from "@/pageComponents/BlogPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Blog | MOLLY YLLOM",
  description:
    "Notes on design, brand and art direction, written by Molly Yllom from Santo Domingo.",
  alternates: { canonical: "/en/blog", languages: languageAlternates("/blog") },
  openGraph: {
    title: "Blog | MOLLY YLLOM",
    description: "Notes on design, brand and art direction.",
    url: "/en/blog",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <BlogPage />;
}
