import Asterisk from "@/../public/assets/icons/asterisk.svg";
import Code from "@/../public/assets/icons/code.svg";
import Server from "@/../public/assets/icons/server.svg";
import Wrench from "@/../public/assets/icons/wrench.svg";
import Flask from "@/../public/assets/icons/flask.svg";
import Globe from "@/../public/assets/icons/globe.svg";
import Router from "@/../public/assets/icons/router.svg";

export const HOME_SKILLS_ITEMS = ["FrontEnd", "BackEnd", "Maintenance", "SoftwareTest", "PerformanceDigitalPresence", "WebHosting"];

export const HOME_SKILLS_CARDS = {
  FrontEnd: {
    icon: Code,
    items: [
      {
        title: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        invert: false,
      },
      {
        title: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        invert: false,
      },
      {
        title: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        invert: false,
      },
      {
        title: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        invert: false,
      },
      {
        title: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        invert: false,
      },
      {
        title: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        invert: false,
      },
      {
        title: "CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        invert: false,
      },
    ],
  },
  BackEnd: {
    icon: Server,
    items: [
      {
        title: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        invert: false,
      },
      {
        title: "NestJS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
        invert: false,
      },
      {
        title: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        invert: false,
      },
      {
        title: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        invert: false,
      },
      {
        title: "Postgres",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        invert: false,
      },
      {
        title: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        invert: false,
      },
      {
        title: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        invert: false,
      },
    ],
  },
  Maintenance: {
    icon: Wrench,
    items: [
      {
        title: "Grafana",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
        invert: false,
      },
    ],
  },
  SoftwareTest: {
    icon: Flask,
    items: [
      {
        title: "Jest",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
        invert: false,
      },
      {
        title: "JMeter",
        icon: Asterisk,
        invert: true,
      },
      {
        title: "Supertest",
        icon: Asterisk,
        invert: true,
      },
      {
        title: "Faker",
        icon: Asterisk,
        invert: true,
      },
    ],
  },
  PerformanceDigitalPresence: {
    icon: Globe,
    items: [
      {
        title: "Google Tag Manager",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
        invert: false,
      },
      {
        title: "Google Analytics",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
        invert: false,
      },
      {
        title: "SEO",
        icon: Asterisk,
        invert: true,
      },
      {
        title: "Lighthouse",
        icon: Asterisk,
        invert: true,
      },
    ],
  },
  WebHosting: {
    icon: Router,
    items: [
      {
        title: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        invert: true,
      },
      {
        title: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        invert: false,
      },
      {
        title: "Cloudflare",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
        invert: false,
      },
      {
        title: "Netlify",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg",
        invert: true,
      },
    ],
  },
};
