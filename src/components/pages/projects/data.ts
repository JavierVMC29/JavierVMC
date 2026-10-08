import type { ImageMetadata } from "astro";
import DataProtectionAssistant from "@/assets/images/data-protection-assistant.jpg";
import Daule from "@/assets/images/daule.jpg";
import DeveloperTools from "@/assets/images/developer-tools.jpg";
import Zentinel from "@/assets/images/zentinel.jpg";
import Hermes from "@/assets/images/hermes.jpg";
import GpaCalculator from "@/assets/images/gpa-calculator.jpg";

export type ProjectKind = "work" | "freelance" | "personal";

export interface ProjectItem {
  /** Key of the `Projects.<key>` message (title, summary, highlight_N). */
  key: string;
  image: ImageMetadata;
  /** Tailwind object-position class for the screenshot crop (default: "object-top"). */
  imagePosition?: string;
  kind: ProjectKind;
  /** Optional company shown next to the kind badge, e.g. "Telecu". */
  company?: string;
  /** Public URL. Omit for internal projects. */
  href?: string;
  githubHref?: string;
  /** Not published yet: shows "Coming soon" with the future domain instead of a link. */
  comingSoon?: boolean;
  /** Shown as large cards at the top, and on the home page. */
  featured?: boolean;
  skills: string[];
}

/** Display order: featured first, then by impact. */
export const PROJECTS: ProjectItem[] = [
  {
    key: "DataProtectionAssistant",
    image: DataProtectionAssistant,
    kind: "work",
    featured: true,
    skills: ["Python", "LangChain", "OpenAI", "FastAPI", "ChromaDB", "PostgreSQL", "TypeScript", "React", "Tailwind", "Cypress", "Jest", "Vite", "Docker", "Keycloak"],
  },
  {
    key: "Daule",
    image: Daule,
    imagePosition: "object-left-top",
    kind: "freelance",
    href: "https://enlinea.daule.gob.ec/",
    featured: true,
    skills: ["TypeScript", "React", "Tailwind", "Cypress", "Jest", "Vite", "Jenkins"],
  },
  {
    key: "DeveloperTools",
    image: DeveloperTools,
    kind: "personal",
    href: "https://developer-tools.javiervmc.com",
    skills: ["Astro", "TypeScript", "Tailwind", "Zod"],
  },
  {
    key: "Zentinel",
    image: Zentinel,
    kind: "work",
    skills: ["TypeScript", "React", "NestJS", "Node.js", "Express", "TypeORM", "PostgreSQL", "Keycloak", "Docker", "Astro", "Tailwind"],
  },
  {
    key: "Hermes",
    image: Hermes,
    kind: "work",
    skills: ["TypeScript", "React", "Tailwind", "NestJS", "TypeORM", "Keycloak", "PostgreSQL", "Docker"],
  },
  {
    key: "GpaCalculator",
    image: GpaCalculator,
    kind: "personal",
    href: "https://calculadora-espol.javiervmc.com",
    githubHref: "https://github.com/JavierVMC29/calculadora-espol",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];
