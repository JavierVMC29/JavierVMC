# javiervmc.com

Portfolio of Javier Vega Molina, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Available in English (`/en`) and Spanish (`/es`).

## Getting started

Requires Node.js 22.12+ (see `.node-version`).

```bash
npm install
npm run dev       # http://localhost:4321
```

## Scripts

| Command                  | Action                                              |
| ------------------------ | --------------------------------------------------- |
| `npm run dev`            | Start the dev server                                |
| `npm run build`          | Build the static site into `dist/`                  |
| `npm run preview`        | Preview the production build locally                |
| `npm run check`          | Type-check the project                              |
| `npm run generate-fonts` | Regenerate `src/styles/fonts.css` from `public/fonts` |

## Content

Texts live in `messages/en.json` and `messages/es.json`. Project images and links are in `src/components/pages/projects/data.ts`.

## Deploy

The build output (`dist/`) is a fully static site and can be served by any static host (Vercel, Netlify, Cloudflare Pages, etc.).
