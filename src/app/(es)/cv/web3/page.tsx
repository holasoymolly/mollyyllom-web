import type { Metadata } from "next"
import { Web3CV } from "@/cv/pageComponents/web3/Web3CV"

export const metadata: Metadata = {
  title: "Web3 CV | Molly Yllom, Head of Design, Solana Ecosystem",
  description: "Head of Design at Aerosol in the Solana ecosystem, designing and building visual identities and digital experiences for crypto-native products.",
  // The CV pages carry their language in the URL already, so they pair with
  // each other rather than with an /en twin.
  alternates: {
    canonical: "/cv/web3",
    languages: { en: "/cv/web3", es: "/cv/es/web3", "x-default": "/cv/web3" },
  },
}

export default function Web3CVPage() {
  return <Web3CV lang="en" />
}
