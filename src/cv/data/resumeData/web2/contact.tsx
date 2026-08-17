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
    `Brand and Product Designer with ${yearsOfExperience}+ years building scalable visual systems across agencies, freelance work, and Web3 products.`,
    "Experienced in translating brand strategy into digital experiences spanning identity systems, interfaces, and marketing assets.",
  ],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mollyyllom" },
    { label: "X", href: "https://x.com/holasoymolly" },
  ],
}
