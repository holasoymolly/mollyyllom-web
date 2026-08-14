import type { Experience } from "../../../types"
import React from "react"
import { URLS } from "../../constants"

export const experience: Experience[] = [
  {
    company: "Aerosol",
    role: "Head of Design",
    start: "2026",
    end: "Present",
    current: true,
    featureHighlight: "Leading design across the Aerosol ecosystem on Solana — brand system, product interfaces, and front-end.",
    highlights: [
      "Lead all design across the company: brand identity, product UX, marketing, and web.",
      "Design across product, web, social, and campaigns for ecosystem products including Jobskr and Spotlight.",
      <>Led the full redesign of <a href={URLS.BURN_AND_CLAIM} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Burn & Claim</a>, and ship the front-end in Next.js, React, and Tailwind.</>,
    ],
    stack: ["Brand Systems", "Product Design", "Figma", "Next.js", "React", "Solana"],
  },
  {
    company: "Aerosol",
    role: "Brand Consultant & Art Director",
    start: "2024",
    end: "2026",
    featureHighlight: "Shaped the early visual identity of the Aerosol ecosystem before the Head of Design role.",
    highlights: [
      "Evolved Aerosol's brand into a scalable, digital-first visual system aligned with Web3 culture.",
      "Designed early product, web, social, and campaign touchpoints across the ecosystem.",
    ],
    stack: ["Brand Identity", "Art Direction", "Figma", "Landing Pages", "Solana"],
  },
  {
    company: "Mollyverse",
    role: "Designer & Front-end Developer",
    start: "2026",
    end: "Present",
    current: true,
    featureHighlight: "Designed and built my own Web3 platform end to end on Solana.",
    highlights: [
      <>Designed and shipped <a href={URLS.MOLLYVERSE} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">mollyverse.art</a> and a native app on the Solana dApp Store, built in Next.js, React, and Tailwind.</>,
      "Owned the full journey from concept and identity to launch; first collection of 111 pieces sold out.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity", "Product Design", "Solana"],
  },
]
