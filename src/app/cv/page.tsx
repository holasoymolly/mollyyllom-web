import type { Metadata } from "next"
import { NormieCV } from "@/cv/pageComponents/normie/NormieCV"

export const metadata: Metadata = {
  title: "CV | Molly Yllom, Senior Brand & Product Designer",
  description: "Brand and Product Designer with 17+ years building scalable visual systems across agencies, freelance work, and Web3 products.",
  // The CV pages carry their language in the URL already, so they pair with
  // each other rather than with an /en twin.
  alternates: {
    canonical: "/cv",
    languages: { en: "/cv", es: "/cv/es", "x-default": "/cv" },
  },
}

export default function CVPage() {
  return <NormieCV lang="en" />
}
