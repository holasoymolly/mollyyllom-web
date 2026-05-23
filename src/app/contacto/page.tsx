import type { Metadata } from "next";
import { ContactPage } from "@/pageComponents/ContactPage";

export const metadata: Metadata = {
  title: "Contacto | MOLLY YLLOM",
  description:
    "Hablemos de tu próximo proyecto. Escríbeme o agenda una llamada de 30 minutos para revisar tu marca.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | MOLLY YLLOM",
    description:
      "Hablemos de tu próximo proyecto. Escríbeme o agenda una llamada de 30 minutos.",
    url: "/contacto",
  },
};

export default function Page() {
  return <ContactPage />;
}
