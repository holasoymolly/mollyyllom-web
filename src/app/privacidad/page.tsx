import type { Metadata } from "next";
import { PrivacyPage } from "@/pageComponents/PrivacyPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Privacidad | MOLLY YLLOM",
  description: "Qué datos recoge mollyyllom.com, para qué y con quién se comparten.",
  alternates: { canonical: "/privacidad", languages: languageAlternates("/privacidad") },
};

export default function Page() {
  return <PrivacyPage />;
}
