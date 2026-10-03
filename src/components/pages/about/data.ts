import type { YearMonth } from "@/lib/dates";

export type SkillIcon = "languages" | "backend" | "frontend" | "ai" | "databases" | "cloud" | "tests";

/** Keys match the `About.Skills.<key>.title` messages; groups render in this order. */
export const ABOUT_SKILLS: { key: string; icon: SkillIcon; items: string[] }[] = [
  {
    key: "Languages",
    icon: "languages",
    items: ["TypeScript", "JavaScript", "Java", "Python", "C#", "PHP", "SQL", "HTML", "CSS"],
  },
  {
    key: "Backend",
    icon: "backend",
    items: ["Node.js", "NestJS", "Express", "Spring Boot", "FastAPI", ".NET Core", "TypeORM", "SQLAlchemy", "Hibernate", "Entity Framework"],
  },
  {
    key: "Frontend",
    icon: "frontend",
    items: ["React", "Next.js", "Astro", "React Native", "Tailwind CSS", "React Query", "React Hook Form", "Zod", "Yup"],
  },
  {
    key: "AI",
    icon: "ai",
    items: ["LangChain", "RAG", "AI Agents", "OpenAI", "Gemini", "ChromaDB"],
  },
  {
    key: "Databases",
    icon: "databases",
    items: ["PostgreSQL", "Microsoft SQL Server", "MySQL", "MongoDB", "Redis", "DynamoDB", "OpenSearch"],
  },
  {
    key: "Cloud",
    icon: "cloud",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "RabbitMQ", "Nginx", "Grafana"],
  },
  {
    key: "Tests",
    icon: "tests",
    items: ["Jest", "Supertest", "Cypress", "Faker", "JMeter", "pytest", "JUnit", "Mockito", "Spring Test"],
  },
];

/** Keys match the `About.Education.<key>` messages (degree + institution); newest first. */
export const ABOUT_EDUCATION: {
  key: string;
  initials: string;
  start: YearMonth;
  end: YearMonth;
  location: string;
  graduated: boolean;
}[] = [
  { key: "Masters", initials: "UEES", start: "2025-03", end: "2026-05", location: "Guayaquil, Ecuador", graduated: true },
  { key: "University", initials: "ESPOL", start: "2019-05", end: "2024-03", location: "Guayaquil, Ecuador", graduated: true },
];
