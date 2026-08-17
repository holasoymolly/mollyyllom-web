import type { ReactNode } from "react"

export type Theme = 'normie' | 'web3'

export interface Link {
  label: string
  href: string
}

export interface ContactInfo {
  name: string
  title: string
  location: string
  /** Spanish rendering of `location`, used by the ES CV pages. */
  locationES?: string
  phone: string
  email: string
  summary: string | string[]
  links: Link[]
}

export interface Technology {
  logo?: string
  logoOnly: boolean
  width?: number
  height?: number
  showInMarquee?: boolean
  invertFilter?: boolean
}

export interface SkillCategory {
  title: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  start: string
  end: string
  highlights: ReactNode[]
  stack?: string[]
  current?: boolean
  featureHighlight?: string | ReactNode
  companyNotes?: string | ReactNode
}

export interface Education {
  institution: string
  location: string
  area: string
  start: string
  end: string
}

export interface Reference {
  note: string
}

export interface ResumeData {
  contact: ContactInfo
  skills: SkillCategory[]
  experience: Experience[]
  contractWork?: Experience[]
  education: Education[]
  references: Reference
  technologies: Record<string, Technology>
}
