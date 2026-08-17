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
    featureHighlight: "Liderando el diseño en una empresa de productos digitales en Solana: marca, producto y frontend.",
    highlights: [
      "Lidero todo el diseño de la empresa: identidad de marca, UX de producto, piezas de marketing y web.",
      <>Lideré el rediseño completo de <a href={URLS.BURN_AND_CLAIM} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">Burn &amp; Claim</a>. App, dashboard y sitio de marketing, diseñado y construido en Next.js, React y Tailwind.</>,
      "Construí un sistema de diseño escalable y por niveles, usado en múltiples productos y superficies.",
    ],
    stack: ["Brand Systems", "Product Design", "Next.js", "React", "Tailwind CSS", "Solana"],
  },
  {
    company: "Aerosol",
    role: "Brand Consultant & Art Director",
    start: "2024",
    end: "2026",
    highlights: [
      "Colaboré con Aerosol como consultora de marca y directora de arte antes de asumir el rol de Head of Design.",
      "Definí la dirección de marca inicial y los sistemas visuales, y diseñé piezas de producto y marketing en el ecosistema.",
    ],
    stack: ["Brand Identity", "Art Direction", "Product Design", "Solana"],
  },
  {
    company: "Mollyverse",
    role: "Designer & Front-end Developer",
    start: "2026",
    end: "Presente",
    current: true,
    featureHighlight: "Diseñé y construí mi propia plataforma Web3 de punta a punta, desde la marca hasta un producto en vivo en Solana.",
    highlights: [
      <>Diseñé y publiqué <a href={URLS.MOLLYVERSE} target="_blank" rel="noreferrer" className="text-accent underline hover:opacity-80">mollyverse.art</a> y una app nativa en la Solana dApp Store, construida en Next.js, React y Tailwind.</>,
      "Fui dueña de todo el proceso, del concepto y la identidad al lanzamiento; la primera colección de 111 piezas se agotó.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Brand Identity", "Product Design", "Solana"],
  },
  {
    company: "Freelance",
    role: "Art Director & Brand Designer",
    start: "2008",
    end: "Presente",
    current: true,
    featureHighlight: "Práctica independiente desde 2008, atendiendo clientes en República Dominicana e internacionalmente. Clientes seleccionados: INTEC, JMMB Bank, FAMA Collective.",
    highlights: [
      "Diseñé sistemas escalables de identidad de marca y guías visuales en diversas industrias.",
      "Lideré la dirección creativa de campañas, editoriales y activos digitales de brief a entrega.",
    ],
    stack: ["Brand Identity", "Visual Systems", "Campaign Design", "Print & Digital"],
  },
  {
    company: "Marketing of Minds (MoM)",
    role: "Art Director",
    start: "2019",
    end: "2023",
    highlights: [
      "Lideré el desarrollo de marca y campañas para múltiples clientes en canales digitales e impresos.",
      "Supervisé la ejecución creativa de concepto a entrega final.",
    ],
    stack: ["Art Direction", "Campaign Design", "Brand Strategy"],
  },
  {
    company: "McCann-Erickson",
    role: "Art Director",
    start: "2016",
    end: "2018",
    highlights: [
      "Desarrollé campañas publicitarias de alto impacto para grandes marcas en una de las agencias creativas más reconocidas del mundo.",
      "Lideré el desarrollo de conceptos y el storytelling visual en TV, digital e impreso.",
    ],
    stack: ["Advertising", "Creative Direction", "Brand Campaigns"],
  },
  {
    company: "Room Grupo Creativo",
    role: "Art Director",
    start: "2014",
    end: "2016",
    highlights: [
      "Dirigí arte y campañas para clientes en marca, digital e impreso en una agencia de servicios completos.",
    ],
    stack: ["Art Direction", "Brand Design", "Creative Direction"],
  },
  {
    company: "Banco del Progreso",
    role: "Graphic Designer",
    start: "2012",
    end: "2013",
    highlights: [
      "Diseñé materiales de marketing y comunicación para uno de los principales bancos de República Dominicana.",
    ],
    stack: ["Graphic Design", "Brand Assets", "Print Design"],
  },
  {
    company: "Room Grupo Creativo",
    role: "Graphic Designer",
    start: "2010",
    end: "2012",
    highlights: [
      "Inicié mi carrera en una agencia de servicios completos, desarrollando bases en diseño visual y dirección de arte.",
    ],
    stack: ["Graphic Design", "Visual Communication"],
  },
]
