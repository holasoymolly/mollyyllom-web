import type { Metadata } from "next";
import { PrivacyPage } from "@/pageComponents/PrivacyPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Privacidad | MOLLY YLLOM",
  description: "Qué datos recoge mollyyllom.com, para qué y con quién se comparten.",
  alternates: { canonical: "/privacidad", languages: languageAlternates("/privacidad") },
  // Without its own openGraph the page inherited the root layout's, which is
  // in Spanish and calls the site a design studio.
  openGraph: {
    title: "Privacidad | MOLLY YLLOM",
    description: "Qué datos recoge mollyyllom.com, para qué y con quién se comparten.",
    url: "/privacidad",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <PrivacyPage />;
}
