import type { Metadata } from "next";
import { ConocemePage } from "@/pageComponents/ConocemePage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "About | MOLLY YLLOM",
  description:
    "Graphic designer and art director with more than 17 years creating memorable visual identities. Read my story and my approach to creative work.",
  alternates: { canonical: "/en/conoceme", languages: languageAlternates("/conoceme") },
  openGraph: {
    title: "About | MOLLY YLLOM",
    description:
      "Graphic designer and art director with more than 17 years creating memorable visual identities.",
    url: "/en/conoceme",
    type: "profile",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <ConocemePage />;
}
