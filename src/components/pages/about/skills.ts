/** Keys match the `About.Skills.<key>.title` messages; groups render in this order. */
export const ABOUT_SKILLS: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "Java", "C#", "SQL", "HTML", "CSS"],

  Frameworks: [
    // Backend
    "NestJS",
    "Express",
    "FastAPI",
    "Spring Boot",
    ".NET Core",

    // Frontend
    "React",
    "Next.js",
    "Tailwind CSS",

    // Forms & Validation
    "React Hook Form",
    "Zod",
    "Yup",

    // State / Data Management
    "React Query",

    // ORMs / DB Tools
    "TypeORM",
    "SQLAlchemy",
    "Hibernate",
    "Entity Framework",
  ],

  Databases: ["PostgreSQL", "Microsoft SQL Server", "MongoDB", "Redis", "MySQL", "ChromaDB"],

  Microservices: ["AWS", "Docker", "Kubernetes", "RabbitMQ", "Grafana"],

  Tests: [
    // JavaScript / TypeScript
    "Jest",
    "Supertest",
    "Cypress",
    "Faker",
    "JMeter",

    // Python
    "pytest",

    // Java
    "JUnit",
    "Mockito",
    "Spring Test",
  ],
};

/** Keys match the `About.Education.<key>` messages. */
export const ABOUT_EDUCATION = ["University", "Bootcamp"];
