import { monthsBetween, type YearMonth } from "@/lib/dates";

export type EmploymentType = "fullTime" | "partTime" | "contract" | "internship";
export type Workplace = "onSite" | "remote" | "hybrid";

export interface Role {
  /** Key of the `Experiences.<key>` message holding title, subtitle (company name) and content_N. */
  key: string;
  start: YearMonth;
  /** `null` while it is the current role. */
  end: YearMonth | null;
  /** Tech stack shown as chips under the role. */
  skills: string[];
}

export interface Company {
  /** Used for the card anchor (`#exp-<id>`). */
  id: string;
  /** Monogram shown as the company "logo". */
  initials: string;
  employment: EmploymentType;
  workplace?: Workplace;
  location?: string;
  /** Newest role first. Several roles render as a promotion path inside one card. */
  roles: Role[];
}

/** Newest first; this order is the timeline order. */
export const EXPERIENCE: Company[] = [
  {
    id: "banco-bolivariano",
    initials: "BB",
    employment: "fullTime",
    workplace: "onSite",
    location: "Guayaquil, Ecuador",
    roles: [
      {
        key: "Experience_1",
        start: "2026-02",
        end: null,
        skills: ["Java", "Spring Boot", "AWS", "DynamoDB", "OpenSearch", "REST APIs"],
      },
    ],
  },
  {
    id: "telecu",
    initials: "T",
    employment: "fullTime",
    workplace: "remote",
    location: "Guayaquil, Ecuador",
    roles: [
      {
        key: "Experience_2",
        start: "2024-10",
        end: "2025-12",
        skills: ["TypeScript", "Node.js", "NestJS", "React", "Python", "LangChain", "FastAPI", "RabbitMQ", "PostgreSQL", "Docker", "Grafana"],
      },
      {
        key: "Experience_3",
        start: "2023-09",
        end: "2024-09",
        skills: ["TypeScript", "Node.js", "Express", "NestJS", "React", "RabbitMQ", "PostgreSQL"],
      },
    ],
  },
  {
    id: "prefectura-del-guayas",
    initials: "PG",
    employment: "contract",
    workplace: "remote",
    location: "Guayas, Ecuador",
    roles: [
      {
        key: "Experience_4",
        start: "2023-10",
        end: "2024-02",
        skills: ["React Native", "TypeScript", "NestJS", "Azure"],
      },
    ],
  },
  {
    id: "sipecom",
    initials: "S",
    employment: "internship",
    workplace: "onSite",
    location: "Guayaquil, Ecuador",
    roles: [
      {
        key: "Experience_5",
        start: "2023-02",
        end: "2023-08",
        skills: ["PHP", "Spring Boot", "MySQL", "Azure", "Docker", "Nginx"],
      },
    ],
  },
  {
    id: "espol",
    initials: "E",
    employment: "partTime",
    workplace: "remote",
    location: "Guayaquil, Ecuador",
    roles: [
      {
        key: "Experience_6",
        start: "2022-09",
        end: "2022-12",
        skills: ["Python", "Ruby", "Dart", "JavaScript", "PHP", "Clojure"],
      },
    ],
  },
  {
    id: "zede-del-litoral",
    initials: "Z",
    employment: "internship",
    roles: [
      {
        key: "Experience_7",
        start: "2020-05",
        end: "2020-09",
        skills: ["HTML", "CSS", "JavaScript"],
      },
    ],
  },
];

/** Message key of the role held today, or `null` between jobs. */
export function currentRoleKey(): string | null {
  return EXPERIENCE.find((company) => company.roles[0].end === null)?.roles[0].key ?? null;
}

/** Whole years since the first full-time or contract role (not internships or part-time teaching). */
export function professionalYears(): number {
  const firstStart = EXPERIENCE.filter((company) => ["fullTime", "contract"].includes(company.employment))
    .flatMap((company) => company.roles.map((role) => role.start))
    .sort()[0];
  return Math.floor(monthsBetween(firstStart) / 12);
}
