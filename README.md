# Ayush Singh — Portfolio

Personal portfolio and project case studies. Live at [ayush.jeearchive.in](https://ayush.jeearchive.in).

## Stack

- **[Astro](https://astro.build)**: static output with almost no client JavaScript
- **Responsive images** via `astro:assets` (AVIF/WebP, `srcset`, lazy loading)
- **Content collections**: each project is a Markdown file with a typed schema
- **Native view transitions** for page navigation (the sliding nav pill and project covers)
- Deployed on **Cloudflare** (build command `npm run build`, output `dist/`; `public/_headers` and `public/_redirects` set caching and redirects)

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Project structure

```
src/
  assets/            source images (optimized at build time)
  components/        Nav, Footer, ProjectCard, ContactCTA, Icon
  content/projects/  one Markdown file per project → /work/<slug>
  data/site.ts       personal details, links, experience, education, skills, stats
  layouts/Base.astro SEO/meta, JSON-LD, nav + footer shell
  pages/             / (Info), /work, /work/[slug], 404
  styles/global.css  design tokens and shared styles
public/              favicon, OG image, robots.txt, manifest
```

## Adding a project

Create `src/content/projects/<slug>.md`:

```md
---
title: Project name
tagline: One-line summary shown on the card and as the meta description.
order: 7
category: Product        # Internship | Product | Client work | Personal
status: Live             # Live | In progress | Archived
year: '2026'             # optional
role: Full-stack Developer
team: Solo               # optional
stack: [Next.js, MongoDB]
metrics:                 # optional, shown as chips and big numbers
  - value: 10K+
    label: Users
links:
  live: https://example.com
  repo: https://github.com/...   # or `repoPrivate: true`
cover: ../../assets/projects/<slug>.webp   # optional: without it, a text cover is shown
coverAlt: Describe the screenshot
---

## Overview
...
```

The card on `/work` and the case study page at `/work/<slug>` are generated automatically.
