import type { Metadata } from "next";
import { ContactPage } from "@/pageComponents/ContactPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Contact | MOLLY YLLOM",
  description:
    "Let's talk about your next project. Write to me or book a 30 minute call to go over your brand.",
  alternates: { canonical: "/en/contacto", languages: languageAlternates("/contacto") },
  openGraph: {
    title: "Contact | MOLLY YLLOM",
    description:
      "Let's talk about your next project. Write to me or book a 30 minute call.",
    url: "/en/contacto",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <ContactPage />;
}
