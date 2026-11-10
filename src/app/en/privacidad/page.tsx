import type { Metadata } from "next";
import { PrivacyPage } from "@/pageComponents/PrivacyPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Privacy | MOLLY YLLOM",
  description: "What data mollyyllom.com collects, why, and who it is shared with.",
  alternates: { canonical: "/en/privacidad", languages: languageAlternates("/privacidad") },
};

export default function Page() {
  return <PrivacyPage />;
}
