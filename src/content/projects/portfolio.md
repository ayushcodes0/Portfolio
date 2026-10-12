---
title: This Portfolio
tagline: My personal site, rebuilt for speed with Astro, responsive images and zero-JS-by-default pages.
order: 6
category: Personal
status: Live
year: 2025 – 2026
role: Design & Development
team: Solo
stack: [Astro, TypeScript, CSS]
links:
  live: https://ayush.jeearchive.in/
  repo: https://github.com/ayushcodes0/Portfolio
cover: ../../assets/projects/portfolio.webp
coverAlt: Portfolio work page with the macOS-style window hero
---

## Overview

The first version of this site (January 2025) was hand-written HTML, CSS and JavaScript. It looked the way I wanted, but every new screen size needed another patch. In 2026 I rebuilt it to keep the exact same design while fixing everything underneath.

## What changed in the rebuild

- **Astro, static output.** Pages ship as plain HTML with almost no JavaScript.
- **Responsive images.** Every image is resized and served as AVIF/WebP at the right size for each device. The heaviest page went from megabytes of images to a fraction of that.
- **Layout in normal flow.** No fixed section heights or per-breakpoint negative margins, so it holds up at every width.
- **Case studies.** Projects are Markdown files with a typed schema, so each one gets a full page.
- **Native view transitions** for the sliding nav pill and project images, with no JavaScript delay before navigation.
- **Accessibility and SEO.** Semantic landmarks, keyboard-friendly menus, focus styles, Open Graph tags and structured data.
