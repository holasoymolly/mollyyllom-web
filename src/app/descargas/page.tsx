import type { Metadata } from "next";
import { DownloadsPage } from "@/pageComponents/DownloadsPage";

export const metadata: Metadata = {
  title: "Descargas | MOLLY YLLOM",
  description:
    "Plantillas y recursos gratuitos para mejorar tu proceso creativo: checklists de logotipo, manual de marca y preferencias de Illustrator.",
  alternates: { canonical: "/descargas" },
  openGraph: {
    title: "Descargas | MOLLY YLLOM",
    description:
      "Plantillas y recursos gratuitos para mejorar tu proceso creativo.",
    url: "/descargas",
  },
};

export default function Page() {
  return <DownloadsPage />;
}
