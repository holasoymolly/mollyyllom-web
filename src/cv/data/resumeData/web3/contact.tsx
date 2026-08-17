import type { ContactInfo } from "../../../types"
import { calculateYearsOfExperience } from "@/cv/utils/experience"
import { experience } from "./experience"

const yearsOfExperience = calculateYearsOfExperience(experience)

export const contact: ContactInfo = {
  name: "Molly Yllom",
  title: "Senior Brand & Product Designer",
  location: "Santo Domingo, Dominican Republic",
  locationES: "Santo Domingo, República Dominicana",
  phone: "+1 809 440 8161",
  email: "hola@mollyyllom.com",
  summary: [
    `Brand Consultant and Art Director in the Solana ecosystem with ${yearsOfExperience}+ years of design experience.`,
    "Designing visual identities and digital experiences for crypto-native products at Aerosol.",
  ],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mollyyllom" },
    { label: "X", href: "https://x.com/holasoymolly" },
  ],
}
