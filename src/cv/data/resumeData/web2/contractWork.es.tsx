import type { Experience } from "../../../types"
import React from "react"
import { URLS } from "../../constants"

export const contractWorkES: Experience[] = [
  {
    company: "MariaLunares.com",
    role: "Creative Director & Front-end Developer",
    start: "2023",
    end: "2024",
    featureHighlight: "Propiedad creativa y técnica total del universo digital de una artista musical independiente.",
    highlights: [
      <>Diseñé y desarrollé <a href={URLS.MARIA_LUNARES} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">marialunares.com</a>. Identidad de marca, dirección de arte y desarrollo frontend en un proyecto cohesivo.</>,
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity", "Creative Direction"],
  },
  {
    company: "Mollyyllom.com",
    role: "Designer & Front-end Developer",
    start: "2024",
    end: "Presente",
    highlights: [
      <>Diseñé y desarrollé <a href={URLS.MOLLYYLLOM} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">mollyyllom.com</a>. Identidad de marca personal traducida en un portfolio digital completamente responsivo.</>,
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity"],
  },
  {
    company: "JMMB Bank",
    role: "Brand Designer",
    start: "2015",
    end: "2019",
    highlights: [
      "Diseñé identidad de marca y activos de comunicación garantizando consistencia visual en todos los puntos de contacto digitales e impresos.",
    ],
    stack: ["Brand Identity", "Visual Systems", "Print & Digital"],
  },
]
