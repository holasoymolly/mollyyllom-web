import type { Metadata } from "next"
import { Web3CV } from "@/cv/pageComponents/web3/Web3CV"

export const metadata: Metadata = {
  title: "CV Web3 | Molly Yllom, Head of Design, Ecosistema Solana",
  description: "Head of Design en Aerosol, en el ecosistema Solana, diseñando y construyendo identidades visuales y experiencias digitales para productos crypto-native.",
  // The CV pages carry their language in the URL already, so they pair with
  // each other rather than with an /en twin.
  alternates: {
    canonical: "/cv/es/web3",
    languages: { en: "/cv/web3", es: "/cv/es/web3", "x-default": "/cv/web3" },
  },
}

export default function Web3CVPageES() {
  return <Web3CV lang="es" />
}
