# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Javier Vega Molina (javiervmc.com). Astro 7 static site (no UI framework, no client-side React) styled with Tailwind CSS v4. It was migrated from Next.js + shadcn/ui; the markup and Tailwind classes were ported verbatim so the site looks the same — keep that in mind before "cleaning up" odd-looking classes. Node version is pinned in `.node-version`.

## Commands

```bash
npm run dev             # astro dev (http://localhost:4321)
npm run build           # static build into dist/
npm run preview         # serve dist/
npm run check           # astro check (TypeScript + .astro diagnostics)
npm run generate-fonts  # regenerate src/styles/fonts.css after adding/removing fonts
```

There is no test suite. `npm run check` reports two harmless hints in `src/pages/[...slug].astro` caused by `define:vars`.

## Architecture

### Routing and i18n
- Every page is statically generated per locale under `src/pages/[locale]/` (`en`, `es`) via `getLocaleStaticPaths`. Route files are thin: they pick the page component from `src/components/pages/<page>/` and pass title/description to `BaseLayout`.
- `src/pages/[...slug].astro` generates the locale-less URLs (`/`, `/about`, …) as client-side redirects: last visited locale (localStorage `locale`, set by `BaseLayout`) → browser languages → `en`. This replaces the old next-intl middleware.
- `src/i18n/index.ts` exposes `getTranslations(locale, namespace)` (a next-intl-like `t`). Missing keys throw, so they fail the build. Top-level namespaces are in the `GlobalMessageKeys` enum (`Experience` maps to the `"Experiences"` namespace).

### Content model
Almost all copy lives in `messages/en.json` and `messages/es.json`, which must stay structurally identical. Repeated items use numbered keys and are discovered with `t.numberedKeys(key, prefix)`, so their count is never hardcoded:
- **Experience**: `Experiences.Experience_N` (`date`, `icon` = `Work` | `University` | `Course`, `title`, `subtitle`, `content_N`, `html_content`). `html_content` is injected with `set:html` (trusted, repo-controlled).
- **Projects**: translated `title`, `description`, `tag_N` under `Projects.Project_N`; image, links and untranslated tech tags in `src/components/pages/projects/data.ts` under the same `Project_N` key. Adding a project needs both.
- **About**: `MainInfo.content_N` and `Concepts.content_N`; skill lists and education keys in `src/components/pages/about/skills.ts`.
- **Home skills cards**: icons/tech lists in `src/components/pages/home/data.ts`, keyed like `HomePage.Skills.<key>`.

Navigation paths inside messages are locale-prefixed (`/en/about`), so they differ between the two files.

### UI and styling
- shadcn/ui is no longer a dependency: the class recipes of the components the site used (button, card, separator) live in `src/lib/ui.ts` and `src/components/ui/`. `cn()` (clsx + tailwind-merge) runs at build time, so class overrides behave exactly like before.
- Theme tokens are CSS variables in `src/styles/global.css` (Tailwind v4 `@theme inline`, class-based `dark` variant). Shared classes `page-container` and `theme-background` are defined there; hero animation classes in `src/styles/animation.css`.
- Brand fonts: `public/fonts/<folder>/*.woff2` → `npm run generate-fonts` → committed `src/styles/fonts.css` with `@font-face` rules and `.font-brand-<variant>` classes (e.g. `font-brand-book`).
- Images: raster images live in `src/assets/images` and go through `astro:assets` (WebP, responsive `srcset`); SVG icons stay in `public/assets/icons` and are referenced through `src/lib/constants/icons.ts`. `AppImage.astro` renders either kind.

### Client-side JavaScript
Only small vanilla `<script>`s, no framework runtime:
- Theme: an inline script in `BaseLayout` applies the stored/system theme before paint; `src/lib/theme.ts` handles the toggle (same `localStorage.theme` contract as next-themes).
- `LocaleSwitch.astro` (dropdown), `MobileMenu.astro` (side sheet, rendered outside `<header>` because the header's `backdrop-filter` would trap `position: fixed`), and the hero intro animation in `Hero.astro`.
- Mobile vs desktop variants (header menu, experience timeline) are both rendered and switched with `md:` classes; the breakpoint (768px) matches the old `useIsMobile` hook.
- `BaseLayout` also loads Google Tag Manager and Google AdSense (`public/ads.txt`). Link prefetch on hover is enabled in `astro.config.mjs`.
