import type { Metadata } from "next";
import { ConocemePage } from "@/pageComponents/ConocemePage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Conóceme | MOLLY YLLOM",
  description:
    "Diseñadora gráfica y directora de arte con más de 17 años creando identidades visuales memorables. Conoce mi historia y mi enfoque creativo.",
  alternates: { canonical: "/conoceme", languages: languageAlternates("/conoceme") },
  openGraph: {
    title: "Conóceme | MOLLY YLLOM",
    description:
      "Diseñadora gráfica y directora de arte con más de 17 años creando identidades visuales memorables.",
    url: "/conoceme",
    locale: "es_ES",
    alternateLocale: "en_US",
    type: "profile",
  },
};

export default function Page() {
  return <ConocemePage />;
}
