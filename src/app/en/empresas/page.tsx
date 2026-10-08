import type { Metadata } from "next";
import { BusinessPage } from "@/pageComponents/BusinessPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Brand and website for businesses | MOLLY YLLOM",
  description:
    "Brand, logo, identity system and website made by the same person, so what you approve is what goes live. Over seventeen years of experience.",
  alternates: { canonical: "/en/empresas", languages: languageAlternates("/empresas") },
  openGraph: {
    title: "Brand and website for businesses | MOLLY YLLOM",
    description:
      "Brand, logo, identity and website made by the same person. Over seventeen years of experience.",
    url: "/en/empresas",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <BusinessPage />;
}
