import { ICONS, type PublicIcon } from "@/lib/constants/icons";

export const HERO_CTAS = ["Projects", "Contact"] as const;

export const HERO_CTAS_IMAGES = {
  Projects: ICONS.externalLink,
  Contact: ICONS.mail,
};

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

interface HomeSkill {
  title: string;
  icon: string | PublicIcon;
  invert: boolean;
}

/** Keys match the `HomePage.Skills.<key>` messages; cards render in this order. */
export const HOME_SKILLS_CARDS: Record<string, { icon: PublicIcon; items: HomeSkill[] }> = {
  FrontEnd: {
    icon: ICONS.code,
    items: [
      { title: "TypeScript", icon: devicon("typescript/typescript-original"), invert: false },
      { title: "Next.js", icon: devicon("nextjs/nextjs-original"), invert: false },
      { title: "React", icon: devicon("react/react-original"), invert: false },
      { title: "Tailwind", icon: devicon("tailwindcss/tailwindcss-original"), invert: false },
      { title: "JavaScript", icon: devicon("javascript/javascript-original"), invert: false },
      { title: "HTML", icon: devicon("html5/html5-original"), invert: false },
      { title: "CSS", icon: devicon("css3/css3-original"), invert: false },
    ],
  },
  BackEnd: {
    icon: ICONS.server,
    items: [
      { title: "TypeScript", icon: devicon("typescript/typescript-original"), invert: false },
      { title: "Java", icon: devicon("java/java-original"), invert: false },
      { title: "C#", icon: devicon("csharp/csharp-original"), invert: false },
      { title: "Python", icon: devicon("python/python-original"), invert: false },
      { title: "NestJS", icon: devicon("nestjs/nestjs-original"), invert: false },
      { title: "Spring Boot", icon: devicon("spring/spring-original"), invert: false },
      { title: ".NET", icon: devicon("dotnetcore/dotnetcore-original"), invert: false },
      { title: "FastAPI", icon: devicon("fastapi/fastapi-original"), invert: false },
      { title: "Node.js", icon: devicon("nodejs/nodejs-original"), invert: false },
      { title: "Docker", icon: devicon("docker/docker-original"), invert: false },
      { title: "PostgreSQL", icon: devicon("postgresql/postgresql-original"), invert: false },
      { title: "Microsoft SQL Server", icon: devicon("microsoftsqlserver/microsoftsqlserver-original"), invert: false },
      { title: "Redis", icon: devicon("redis/redis-original"), invert: false },
      { title: "MongoDB", icon: devicon("mongodb/mongodb-original"), invert: false },
    ],
  },
  Maintenance: {
    icon: ICONS.wrench,
    items: [{ title: "Grafana", icon: devicon("grafana/grafana-original"), invert: false }],
  },
  SoftwareTest: {
    icon: ICONS.flask,
    items: [
      { title: "Jest", icon: devicon("jest/jest-plain"), invert: false },
      { title: "JMeter", icon: ICONS.asterisk, invert: true },
      { title: "Supertest", icon: ICONS.asterisk, invert: true },
      { title: "Faker", icon: ICONS.asterisk, invert: true },
    ],
  },
  PerformanceDigitalPresence: {
    icon: ICONS.globe,
    items: [
      { title: "Google Tag Manager", icon: devicon("google/google-original"), invert: false },
      { title: "Google Analytics", icon: devicon("google/google-original"), invert: false },
      { title: "SEO", icon: ICONS.asterisk, invert: true },
      { title: "Lighthouse", icon: ICONS.asterisk, invert: true },
    ],
  },
  WebHosting: {
    icon: ICONS.router,
    items: [
      { title: "Vercel", icon: devicon("vercel/vercel-original"), invert: true },
      { title: "AWS", icon: devicon("amazonwebservices/amazonwebservices-original-wordmark"), invert: false },
      { title: "Cloudflare", icon: devicon("cloudflare/cloudflare-original"), invert: false },
      { title: "Netlify", icon: devicon("netlify/netlify-original"), invert: true },
    ],
  },
};
