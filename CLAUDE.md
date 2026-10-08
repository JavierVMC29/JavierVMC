# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Javier Vega Molina (javiervmc.com). Astro 7 static site (no UI framework, no client-side React) styled with Tailwind CSS v4. It was migrated from Next.js + shadcn/ui; the markup and Tailwind classes were ported verbatim so the site looks the same — keep that in mind before "cleaning up" odd-looking classes. Node version is pinned in `.node-version`.

## Commands

The package manager is pnpm (`pnpm-lock.yaml`); the site is deployed on Netlify.

```bash
pnpm dev             # astro dev (http://localhost:4321)
pnpm build           # static build into dist/
pnpm preview         # serve dist/
pnpm check           # astro check (TypeScript + .astro diagnostics)
pnpm generate-fonts  # regenerate src/styles/fonts.css after adding/removing fonts
```

There is no test suite. `pnpm check` only works with TypeScript 6 (it refuses TypeScript 7). `sharp` must stay a direct dependency: pnpm does not hoist Astro's optional `sharp`, and image optimization fails without it.

## Architecture

### Routing and i18n
- Every page is statically generated per locale under `src/pages/[locale]/` (`en`, `es`) via `getLocaleStaticPaths`. Route files are thin: they pick the page component from `src/components/pages/<page>/` and pass title/description to `BaseLayout`.
- `src/pages/[...slug].astro` generates the locale-less URLs (`/`, `/about`, …) as client-side redirects: last visited locale (localStorage `locale`, set by `BaseLayout`) → browser languages → `en`. This replaces the old next-intl middleware.
- `src/i18n/index.ts` exposes `getTranslations(locale, namespace)` (a next-intl-like `t`). Missing keys throw, so they fail the build. Top-level namespaces are in the `GlobalMessageKeys` enum (`Experience` maps to the `"Experiences"` namespace).

### Content model
Almost all copy lives in `messages/en.json` and `messages/es.json`, which must stay structurally identical. Repeated items use numbered keys and are discovered with `t.numberedKeys(key, prefix)`, so their count is never hardcoded:
- **Experience**: translated `title`, `subtitle` (company name) and `content_N` bullets under `Experiences.Experience_N`, plus UI strings under `Experiences.labels`. Order, dates (`YYYY-MM`, `end: null` = current), employment type, workplace, location and tech chips live in `src/components/pages/experience/data.ts`, which groups roles by company (several roles in one company render as a promotion path). The build fails if an `Experience_N` message is not placed in `data.ts`. Durations are computed (`src/lib/dates.ts`), and figures like `50%`/`500+` in bullets are auto-emphasized, so don't put tech lists in parentheses inside bullets — use `skills`.
- **Projects**: translated `title`, `summary` and `highlight_N` under `Projects.<Key>` (plus UI strings in `Projects.labels`); order, image, kind (work/freelance/personal), links, `comingSoon`, `featured` and tech chips in `src/components/pages/projects/data.ts`. Featured projects render as large cards and are the only ones shown on the home page (`featuredOnly`). The build fails if a project message is missing from `data.ts`. Project screenshots live in `src/assets/images/<project>.jpg`.
- **About**: bio in `MainInfo.content_N`, the "At a glance" card strings in `Facts`, and `Concepts.content_N`. Skill groups (with their icons) and education entries (dates, location, graduated) live in `src/components/pages/about/data.ts`, keyed like `About.Skills.<key>` / `About.Education.<key>`. The current role and years of professional experience shown in About are derived from the experience data, so they update with it.
- **Home skills cards**: icons/tech lists in `src/components/pages/home/data.ts`, keyed like `HomePage.Skills.<key>`.

Navigation paths inside messages are locale-prefixed (`/en/about`), so they differ between the two files.

### UI and styling
- shadcn/ui is no longer a dependency: the class recipes of the components the site used (button, card, separator) live in `src/lib/ui.ts` and `src/components/ui/`. `cn()` (clsx + tailwind-merge) runs at build time, so class overrides behave exactly like before.
- Theme tokens are CSS variables in `src/styles/global.css` (Tailwind v4 `@theme inline`, class-based `dark` variant). Shared classes `page-container` and `theme-background` are defined there; hero animation classes in `src/styles/animation.css`.
- Brand fonts: `public/fonts/<folder>/*.woff2` → `npm run generate-fonts` → committed `src/styles/fonts.css` with `@font-face` rules and `.font-brand-<variant>` classes (e.g. `font-brand-book`).
- Social cards: `src/pages/og/[locale]/[page].png.ts` renders one 1200×630 PNG per page and locale at build time with Satori + resvg (`src/lib/og-card.ts`, brand font converted from WOFF2 with `wawoff2`). `SocialMeta.astro` emits the OG/Twitter tags, also on the locale-less redirect pages, since crawlers don't run their JS. Keep satori at 0.35.x: 0.36.0's ESM build references `__dirname` and breaks the build.
- Images: raster images live in `src/assets/images` and go through `astro:assets` (WebP, responsive `srcset`); SVG icons stay in `public/assets/icons` and are referenced through `src/lib/constants/icons.ts`. `AppImage.astro` renders either kind.

### Client-side JavaScript
Only small vanilla `<script>`s, no framework runtime:
- Theme: an inline script in `BaseLayout` applies the stored/system theme before paint; `src/lib/theme.ts` handles the toggle (same `localStorage.theme` contract as next-themes).
- `LocaleSwitch.astro` (dropdown), `MobileMenu.astro` (side sheet, rendered outside `<header>` because the header's `backdrop-filter` would trap `position: fixed`), and the hero intro animation in `Hero.astro`.
- `ExperiencePage.astro`: fills the timeline rail and lights up its dots on scroll, and refreshes the duration of the current role so it never goes stale between builds. "Show more" for long bullet lists is a native `<details>` (no JS).
- The header menu renders both mobile and desktop variants and switches them with `md:` classes (768px breakpoint).
- `BaseLayout` also loads Google Tag Manager and Google AdSense (`public/ads.txt`). Link prefetch on hover is enabled in `astro.config.mjs`.
