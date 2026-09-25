import type { SkillCategory } from "../../../types"

export const skills: SkillCategory[] = [
  {
    title: "Brand & Identity",
    items: [
      "Brand Strategy",
      "Identity Systems",
      "Art Direction",
      "Brand Guidelines",
      "Visual Storytelling",
      "Concept Development",
    ],
  },
  {
    title: "Product Design",
    items: [
      "UI/UX Design",
      "Design Systems",
      "Landing Pages",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    title: "Front-end",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML / CSS",
    ],
  },
  {
    title: "Design Tools",
    items: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "After Effects",
      "Figma",
    ],
  },
  {
    // BRAND only. WEB3 keeps its crypto items in web3/skills.ts, which is a
    // separate file despite this one living in common/.
    title: "Marketing & Web",
    items: [
      "Campaign Design",
      "Social Media Design",
      "Go-to-Market Design",
    ],
  },
  {
    title: "Workflow",
    items: [
      "Creative Direction",
      "Client Management",
      "Developer Handoff",
      "Agile",
      "Notion",
    ],
  },
]
