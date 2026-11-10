import type { Metadata } from "next";
import { WaitlistPage } from "@/pageComponents/WaitlistPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "In January | MOLLY YLLOM",
  description:
    "Since November I've been in your feed almost every day. In January I'll show you how I made it. Join the list and hear it first.",
  alternates: { canonical: "/en/talleres", languages: languageAlternates("/talleres") },
  openGraph: {
    title: "I have something to tell you | MOLLY YLLOM",
    description: "In January I'll show you how I made everything I posted these months. Join the list and hear it first.",
    url: "/en/talleres",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <WaitlistPage />;
}
