import type { Metadata } from "next"
import { NormieCV } from "@/cv/pageComponents/normie/NormieCV"

export const metadata: Metadata = {
  title: "CV | Molly Yllom, Diseñadora Sénior de Marca y Producto",
  description: "Diseñadora de Marca y Producto con más de 17 años construyendo sistemas visuales escalables en agencias, trabajo independiente y productos Web3.",
  // The CV pages carry their language in the URL already, so they pair with
  // each other rather than with an /en twin.
  alternates: {
    canonical: "/cv/es",
    languages: { en: "/cv", es: "/cv/es", "x-default": "/cv" },
  },
}

export default function CVPageES() {
  return <NormieCV lang="es" />
}
