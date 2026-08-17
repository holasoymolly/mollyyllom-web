import type { Experience } from "../../../types"
import React from "react"
import { URLS } from "../../constants"

export const contractWork: Experience[] = [
  {
    company: "MariaLunares.com",
    role: "Creative Director & Front-end Developer",
    start: "2023",
    end: "2024",
    featureHighlight: "Full creative and technical ownership of an independent music artist's digital universe.",
    highlights: [
      <>Designed and built <a href={URLS.MARIA_LUNARES} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">marialunares.com</a>. Brand identity, art direction and front-end development in one cohesive project.</>,
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity", "Creative Direction"],
  },
  {
    company: "Mollyyllom.com",
    role: "Designer & Front-end Developer",
    start: "2024",
    end: "Present",
    highlights: [
      <>Designed and developed <a href={URLS.MOLLYYLLOM} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">mollyyllom.com</a>. Personal brand identity translated into a fully responsive portfolio site.</>,
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity"],
  },
  {
    company: "JMMB Bank",
    role: "Brand Designer",
    start: "2015",
    end: "2019",
    highlights: [
      "Designed brand identity and communication assets ensuring visual consistency across all print and digital touchpoints.",
    ],
    stack: ["Brand Identity", "Visual Systems", "Print & Digital"],
  },
]
