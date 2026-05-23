import type { Metadata } from "next";
import { ProjectsPage } from "@/pageComponents/ProjectsPage";

export const metadata: Metadata = {
  title: "Proyectos | MOLLY YLLOM",
  description:
    "Portafolio seleccionado de proyectos de branding, identidad visual y dirección de arte para marcas en distintos sectores.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos | MOLLY YLLOM",
    description:
      "Portafolio seleccionado de proyectos de branding, identidad visual y dirección de arte.",
    url: "/proyectos",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
