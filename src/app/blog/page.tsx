import type { Metadata } from "next";
import { BlogPage } from "@/pageComponents/BlogPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Blog | MOLLY YLLOM",
  description:
    "Notas sobre diseño, marca y dirección de arte, escritas por Molly Yllom desde Santo Domingo.",
  alternates: { canonical: "/blog", languages: languageAlternates("/blog") },
  openGraph: {
    title: "Blog | MOLLY YLLOM",
    description: "Notas sobre diseño, marca y dirección de arte.",
    url: "/blog",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <BlogPage />;
}
