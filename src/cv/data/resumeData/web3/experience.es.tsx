import type { Experience } from "../../../types"
import React from "react"
import { URLS } from "../../constants"

export const experienceES: Experience[] = [
  {
    company: "Aerosol",
    role: "Head of Design",
    start: "2026",
    end: "Presente",
    current: true,
    featureHighlight: "Liderando el diseño del ecosistema Aerosol en Solana: sistema de marca, interfaces de producto y frontend.",
    highlights: [
      "Lidero todo el diseño de la empresa: identidad de marca, UX de producto, marketing y web.",
      "Diseño para producto, web, redes sociales y campañas de los productos del ecosistema, incluyendo JobSkr y Spotlight.",
      <>Lideré el rediseño completo de <a href={URLS.BURN_AND_CLAIM} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Burn & Claim</a>, y programo el frontend en Next.js, React y Tailwind.</>,
    ],
    stack: ["Brand Systems", "Product Design", "Figma", "Next.js", "React", "Solana"],
  },
  {
    company: "Aerosol",
    role: "Brand Consultant & Art Director",
    start: "2024",
    end: "2026",
    featureHighlight: "Definí la identidad visual inicial del ecosistema Aerosol antes del rol de Head of Design.",
    highlights: [
      "Evolución de la marca Aerosol hacia un sistema visual digital-first, escalable y alineado con la cultura Web3.",
      "Diseño de las primeras piezas de producto, web, redes y campañas del ecosistema.",
    ],
    stack: ["Brand Identity", "Art Direction", "Figma", "Landing Pages", "Solana"],
  },
  {
    company: "Mollyverse",
    role: "Designer & Front-end Developer",
    start: "2026",
    end: "Presente",
    current: true,
    featureHighlight: "Diseñé y construí mi propia plataforma Web3 de punta a punta en Solana.",
    highlights: [
      <>Diseñé y publiqué <a href={URLS.MOLLYVERSE} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">mollyverse.art</a> y una app nativa en la Solana dApp Store, construida en Next.js, React y Tailwind.</>,
      "Fui dueña de todo el proceso, del concepto y la identidad al lanzamiento; la primera colección de 111 piezas se agotó.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity", "Product Design", "Solana"],
  },
]
