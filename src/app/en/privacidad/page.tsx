import type { Metadata } from "next";
import { PrivacyPage } from "@/pageComponents/PrivacyPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Privacy | MOLLY YLLOM",
  description: "What data mollyyllom.com collects, why, and who it is shared with.",
  alternates: { canonical: "/en/privacidad", languages: languageAlternates("/privacidad") },
  // Without its own openGraph the page inherited the root layout's, which is
  // in Spanish and calls the site a design studio.
  openGraph: {
    title: "Privacy | MOLLY YLLOM",
    description: "What data mollyyllom.com collects, why, and who it is shared with.",
    url: "/en/privacidad",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <PrivacyPage />;
}
