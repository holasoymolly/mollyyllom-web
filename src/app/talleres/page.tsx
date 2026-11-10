import type { Metadata } from "next";
import { WaitlistPage } from "@/pageComponents/WaitlistPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "En enero | MOLLY YLLOM",
  description:
    "Desde noviembre salgo casi todos los días en tu feed. En enero te cuento cómo lo hice. Apúntate y te enteras primero.",
  alternates: { canonical: "/talleres", languages: languageAlternates("/talleres") },
  openGraph: {
    title: "Te tengo que contar algo | MOLLY YLLOM",
    description: "En enero te cuento cómo hice todo lo que publiqué estos meses. Apúntate y te enteras primero.",
    url: "/talleres",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <WaitlistPage />;
}
