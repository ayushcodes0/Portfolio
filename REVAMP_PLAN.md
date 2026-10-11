# Portfolio Revamp Plan (Oct 2026)

A full audit of the current site (`index.html`, `work.html`, `styles/*`, `javascripts/*`, `assets/*`), followed by a phased plan to rebuild it as a production-grade portfolio.

Everything under **Audit** was checked in the code and in a browser at 375px (mobile) and 1440px (desktop).

---

## 0. TL;DR

1. **Rebuild on Astro** (static output, almost no JS, built-in image pipeline, Markdown content collections, View Transitions). Most of the visual hacks go away on their own once the layout is built properly instead of patched with breakpoints.
2. **Turn every project into a case study**: a richer card on `/work` plus a dedicated `/work/<slug>` page (problem → solution → architecture → impact → learnings).
3. **Rebuild the project cards mobile-first**: the description is currently `display:none` on phones and the screenshot floats inside a 320px fixed-height box.
4. **Cut initial page weight by roughly 85–90%**: images are 1.5–1.7 MB each, fonts are hotlinked from another company's Webflow CDN, and Font Awesome is loaded as a JS kit for about 5 icons.
5. **Add missing sections**: Home hero, Impact stats, Featured work, Achievements, Writing, Testimonials, Contact, and a 404 page.
6. **Fix SEO and accessibility basics**: no meta description or OG image, no `<h1>` on the Info page, icon-only links without labels, the drawer isn't keyboard-accessible, and contrast is low.

---

## 1. Audit — what's wrong today

### 1.1 Visual / layout issues ("handled inappropriately")

The root cause: **layout is built from fixed pixel heights, absolute positioning and magic-number breakpoints** instead of normal flow. Each screen size needed another patch.

| # | Issue | Where | Effect |
|---|---|---|---|
| V1 | `body { height: 200vh }`, `.main { height: 100vh }`, `.mac-section { height: 65vw }`, then **negative margins per breakpoint** (`-90px`, `-150px`, `-240px`, `-270px`, `-200px`) to pull projects back up | `styles/work.css:71`, `:84`, `:371`, `:766–851` | Large empty gap under the hero on mobile (confirmed at 375px); the layout breaks at any width between breakpoints |
| V2 | `.fade` overlay positioned with `top: 380/460/520/570/660/700/900px` per breakpoint | `styles/work.css:477–486`, `:755–1026` | The fade drifts off the mac window at intermediate widths |
| V3 | About section uses fixed heights `1300px` / `1500px`, images in boxes of `1000/700/550/450px` | `styles/info.css:464–538`, `:703–754`, `:889` | Tall dead space, awkward crops, content overflow |
| V4 | Desktop and mobile About are **two separate DOM trees with different copy** ("Technical Journey" vs "From Varanasi to Code") | `index.html:88–133` | Mobile and desktop visitors read different bios; double maintenance; both images downloaded |
| V5 | Project cards: fixed `height: 61vw / 80vw / 320px`; description `display:none` under 590px; title/description sized in `vw` (`1.3vw` ≈ 11px at 900px) | `styles/work.css:730–837`, `:1084` | Mobile cards show only a title and a tiny screenshot floating in empty space (confirmed) |
| V6 | Nav: every part is `position:absolute` with pixel offsets (`left: 110px` at <520px). Your name is **hidden entirely** under 520px | `styles/*.css` nav blocks | Brittle; mobile visitors never see who the site belongs to |
| V7 | Fixed nav has **no background/scrolled state** | `.nav` | Page text slides under the floating nav items and overlaps them while scrolling (confirmed) |
| V8 | Nav toggle "pill" positioned via `getBoundingClientRect` in JS after `load`; its glowing `.handle` sits at `top:-8px` and shows as a stray bar above the pill | `javascripts/*.js:33–53` | Pill jumps after load (layout shift); visual glitch |
| V9 | Nav links call `preventDefault()` and then `setTimeout(600ms)` before navigating | `javascripts/*.js:1–31` | Every navigation feels 600ms slow; Cmd/Ctrl-click and middle-click (open in new tab) are broken |
| V10 | Mobile drawer toggles `display:none` together with `scale`, so the transition never runs; no outside-click/Esc close | `javascripts/*.js:55–79` | Menu pops in/out with no animation; feels unpolished |
| V11 | `.footer-line { width:1500px; margin-left:-200px }` | `styles/info.css:799–803` | Horizontal overflow (hidden by `overflow:hidden` on `.main`) |
| V12 | **Broken URL**: `.screen` background is literally `url(https://cdn.prod.website-files.com/63dcb6e…/644af02…_noise-overlay-2.png)`, copied from DevTools with `…` in it | `styles/work.css:467` | 404 request; the mac screen texture never renders |
| V13 | **Gloock (serif) font is never loaded on the Info page** (only `work.css` imports it) | `styles/info.css` | "*empower people.*" falls back to a generic italic sans (confirmed); inconsistent with the Work page |
| V14 | Mac-window traffic-light dots are `1vw` | `styles/work.css:431–436` | About 4px on phones |
| V15 | `text-align: justify` on experience text; footer grid with 2 headings over 4 columns | `styles/info.css:1049`, `:812` | Rivers of whitespace; misaligned footer |
| V16 | No focus styles, inconsistent hover states, `will-change: all` | various | Keyboard users get lost; performance hint misused |

### 1.2 Content bugs and inconsistencies

- **Conflicting numbers**: Info page says jeearchive.in serves "250K+ users", Work page says "500,000+ users". Pick one verified figure.
- **Two projects with nearly the same name**: "JEEArchive" (jeearchive.com, mock tests) and "Jee Archive" (jeearchive.in, study materials). Rename them clearly, e.g. *JEEArchive — Mock Test Platform* and *JEEArchive.in — Study Materials Hub*, or merge them into one case study with two phases.
- **Outdated bio**: "pre-final year student" was written in 2025. It's Oct 2026, so update your year and status (final year / graduating 2027 / open to roles).
- Typos: "Bhag**la**pur" (`work.html:105,125`), "Link**d**In" (both footers), "Tradejournalai" → "TradeJournalAI", "Cse" → "CSE".
- **Malformed HTML**: `<a href="index.html" ... class="h3">Info</h3>` (`index.html:297`).
- Footer "Info" link has `target="_blank"` (opens your own site in a new tab); "Main"/"Contact" headings are `<a>` tags without `href` but with `target="_blank"`.
- LinkedIn in the drawer has no `target`/`rel` while the others do.
- Private repos are shown as a GitHub button that throws a JS toast. Use a non-interactive "Private repo" badge instead.
- `© 2025` is hard-coded.
- Skills section has filler descriptions ("Html — Web structure language") that don't tell a recruiter anything.
- "My Portfolio" project card links to itself and says it's plain HTML/CSS/JS. Replace it after the rebuild, or rewrite it as a mini case study of *this* revamp.
- The resume is a Google Drive link (slow viewer, can break if permissions change). Host `/resume.pdf` on your own domain.

### 1.3 Performance issues

| # | Issue | Evidence | Fix |
|---|---|---|---|
| P1 | **Oversized images** | `ayush1.webp` 1864×4096 **1.48 MB** shown at ~600px; `jeearchive.webp` **1.71 MB**; `AyushAward3.webp` 4160px wide; all project shots are 2880px; `tj.png` is PNG | Responsive `srcset` (400/800/1200/1600w), AVIF + WebP, quality ~70. Target **<120 KB** per screenshot at 1200w |
| P2 | **Preloading 6 images** on Work (2 with `fetchpriority=high`), most below the fold. On mobile Info, the hidden desktop images are preloaded too | `work.html:12–17`, `index.html:11–12` | Preload only the actual LCP element; everything else `loading="lazy" decoding="async"` |
| P3 | No intrinsic `width`/`height` (`width="100%"` is invalid) | all `<img>` | Real dimensions or `aspect-ratio` to avoid CLS |
| P4 | **Fonts hotlinked from someone else's Webflow site** (`cdn.prod.website-files.com/63dcb6e…`): 7 weights, WOFF/TTF/OTF, no WOFF2 | `styles/*.css:5–53` | **Licensing + reliability risk**: PP Neue Montreal is a commercial font, and if that site changes, your typography breaks. Self-host a licensed copy, or switch to a free near-match (*General Sans* / *Satoshi* from Fontshare, or *Geist*). Ship 2–3 weights, WOFF2, subset, `preload` the main weight |
| P5 | Google Fonts loaded via CSS `@import` (render-blocking chain); **Rubik imported but unused** | `styles/work.css:3` | Self-host Gloock (WOFF2, one style), drop Rubik |
| P6 | **Font Awesome JS kit** for ~5 icons | both HTML files | Inline SVG icons (~1 KB total) |
| P7 | External-link SVG hotlinked from the same Webflow CDN about 20 times; noise PNG also hotlinked | HTML/CSS | Local SVG sprite / inline; local noise texture (or CSS/SVG `feTurbulence`) |
| P8 | About 70% of `info.css` and `work.css` is duplicated; JS is duplicated | `styles/`, `javascripts/` | One shared stylesheet with design tokens and components; bundling handled by the build |
| P9 | Heavy paint costs: stacked `backdrop-filter: blur(20–40px)` on every project card + 120px box-shadows | `.project-inner`, `.tool-bar`, `.inner-line` | Blur only on the nav; fake glass on cards with a static gradient; noticeably less scroll jank on mid-range Android |
| P10 | No minification, compression or cache headers | — | Astro build + Vercel `Cache-Control: public, max-age=31536000, immutable` for hashed assets |
| P11 | Unused assets in repo: `AyushAward.webp`, `cynthia.webp`, `portfolio.webp`; `.DS_Store` files committed | `assets/` | Delete; add `.gitignore` |

**Performance budget for the rebuild** (mobile, Lighthouse "Slow 4G"):
LCP < 1.8s · CLS < 0.02 · INP < 100ms · initial transfer < 300 KB · JS < 15 KB · Lighthouse ≥ 98 in all 4 categories.

### 1.4 SEO and sharing

- No `<meta name="description">`, no Open Graph/Twitter card (a LinkedIn share shows a blank preview), no canonical URL.
- Favicon is a `.webp` declared as `image/x-icon`; no `apple-touch-icon`, no `site.webmanifest`.
- No `sitemap.xml`, `robots.txt`, or JSON-LD `Person` schema (helps Google show your name, role and socials).
- URL structure: Info lives at `/index.html`, Work at `/work.html`. Move to clean URLs: `/`, `/work`, `/work/jeearchive`, `/about`.

### 1.5 Accessibility

- No landmarks (`<header> <nav> <main> <footer>`); your name is an `<h3>`; the Info page has no `<h1>`.
- Icon-only links (GitHub / arrow buttons) have no `aria-label`.
- The `@` drawer trigger is a `<div>` (not focusable; no `aria-expanded`; no Esc to close).
- Personal photos have `alt=""`.
- Labels like `#f2f2f266` on `#101010` at 11px are about 3.6:1 contrast, which fails WCAG AA.
- No `prefers-reduced-motion` handling; no visible focus ring.

---

## 2. Target architecture

### 2.1 Stack (recommended)

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (static output) | Zero JS by default (keeps the site fast), file-based routing, **content collections** for case studies, built-in `<Image>`/`<Picture>` pipeline (AVIF/WebP/srcset automatically), View Transitions to replace the 600ms setTimeout hack. You already know React and can drop in React "islands" where needed |
| Styling | Plain CSS with design tokens (custom properties) + CSS modules/scoped styles, or Tailwind v4 if you prefer | Kills the duplicated CSS; one source of spacing/type/colour |
| Content | Markdown/MDX in `src/content/projects/*.mdx`, typed with a Zod schema | Adding a project = adding one file |
| Images | `astro:assets` + source images in `src/assets` | Automatic resizing, modern formats, intrinsic sizes |
| Fonts | Self-hosted WOFF2 via `@fontsource` or local files | No third-party dependency |
| Icons | `astro-icon` (Lucide / Simple Icons), inlined SVG | Replaces Font Awesome |
| Hosting | Vercel (current) with `vercel.json` headers | Preview deploys per PR |
| Analytics | Vercel Web Analytics + Speed Insights (or Plausible) | Privacy-friendly, measures real-user Core Web Vitals |
| Contact form | Formspree / Resend via a Vercel function | Inbound leads without exposing email to scrapers |
| Quality | Prettier, `astro check`, Lighthouse CI + link checker in GitHub Actions | Keeps the budget from regressing |

*If you'd rather avoid a framework:* Vite + vanilla JS + `vite-imagetools` gets about 80% of the performance benefits, but you'd hand-roll case-study templating. Astro is the better fit here.

### 2.2 Proposed structure

```
src/
  assets/               # source images (optimized at build)
  components/
    Nav.astro  Footer.astro  SectionLabel.astro  ProjectCard.astro
    StatStrip.astro  Timeline.astro  TechBadge.astro  ContactCTA.astro
    MacWindow.astro  CaseStudyHeader.astro  Gallery.astro  CommandMenu.tsx (island)
  content/
    projects/   jeearchive-mock-tests.mdx  jeearchive-materials.mdx  tradejournalai.mdx  lawyal-tech.mdx ...
    experience/ tradejournalai.md  lawyal-tech.md
    writing/    (optional blog posts)
  layouts/  Base.astro  CaseStudy.astro
  pages/
    index.astro          # Home
    work/index.astro     # All projects
    work/[slug].astro    # Case study
    about.astro
    writing/[...].astro  # optional
    404.astro
  styles/ tokens.css  global.css
public/  resume.pdf  og/  favicon.svg  robots.txt
```

### 2.3 Design system (keep the current aesthetic, make it systematic)

The dark, glassy, Neue-Montreal-plus-Gloock look is good. Keep it and formalize it:

- **Tokens**: `--bg #0e0e0e`, `--surface`, `--border` (2 levels), `--text`, `--text-muted` (raised to ≥ 4.5:1), one accent colour (used sparingly for links, status dots and focus).
- **Fluid type scale** with `clamp()` instead of `vw` sizes and per-breakpoint overrides, e.g. `--step-5: clamp(2.5rem, 1.6rem + 4.5vw, 6rem)`. Never smaller than 14px for body copy.
- **Spacing scale** (4/8/12/16/24/32/48/64/96/128) and `--container: min(1200px, 100% - 2*var(--gutter))`.
- **Layout in normal flow**: CSS Grid + `aspect-ratio`. No fixed section heights, negative margins or absolutely positioned layout.
- **Reusable "glass frame" component** (the outlined 8px-padding frame is your signature) as one class/component.
- **Motion**: subtle scroll reveal (IntersectionObserver or CSS `animation-timeline: view()`), shared-element View Transitions between card → case study, all disabled under `prefers-reduced-motion`.
- Optional light theme toggle (token-driven, so cheap to add).

---

## 3. Information architecture and new sections

### 3.1 Pages

| Page | Sections |
|---|---|
| **Home `/`** (new) | Hero → Impact stats → Featured work (3 best case studies) → Experience timeline → About teaser → Writing (latest 2–3, optional) → Contact CTA |
| **Work `/work`** | Intro + filter chips (All · Products · Client work · Personal) → project grid/list |
| **Case study `/work/<slug>`** (new) | See §4 |
| **About `/about`** | Story (one version for all devices), photos, education, achievements, skills (grouped), "Now", interests |
| **404** (new) | On-brand, with links back to Work/Home |

The current `index.html` "Info" page becomes `/about`. The new Home page gives visitors a real first impression with a clear CTA ("View work" / "Get in touch") instead of opening on "ABOUT ME".

### 3.2 New sections (with rationale)

1. **Hero with clear positioning + availability.** One line on what you do and for whom, a status pill like "● Open to SDE roles from 2027 / freelance", and two CTAs. Recruiters decide in about 6 seconds.
2. **Impact stats strip.** e.g. *250K+ users served · 7K+ daily actives · 6 products shipped · 2 internships*. Your strongest selling point is currently buried in a paragraph.
3. **Featured work.** The 3 best projects as large cards linking to case studies.
4. **Achievements / Recognition.** You have an award photo (`AyushAward3.webp`) with no explanation. Give it a caption and context (what, who, when). Add hackathons, competitive programming ratings (Codeforces/LeetCode/CodeChef), scholarships.
5. **Education.** IIIT Bhagalpur, B.Tech CSE, years, CGPA (if strong), relevant coursework.
6. **Skills, regrouped.** Frontend / Backend / Data / Tooling / Mobile, each with icons, and optionally "used in: JEEArchive, TradeJournalAI" to link skills to proof. Drop the filler one-liners.
7. **Testimonials.** 1–2 quotes from Lawyal Tech and the TradeJournalAI client (ask them on LinkedIn). Strong social proof.
8. **Writing / Notes** (MDX). Even 2–3 posts like *"Scaling a static study site to 250K users on a student budget"* or *"Building a mock-test engine"* signal depth and help SEO.
9. **GitHub activity.** Contribution graph or pinned repos, fetched **at build time** (no client JS, no rate limits).
10. **"Now" block.** What you're building or learning this month; makes the site feel alive.
11. **Contact section.** Short form (name, email, message) plus direct email/LinkedIn, and a "copy email" button with toast.
12. **Small extras:** ⌘K command menu (jump to any page/project; a nice dev touch), "Last updated" in the footer, a 404 page.

---

## 4. Projects: from a heading line to case studies (priority)

### 4.1 Content model (`src/content/config.ts`)

```ts
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    tagline: z.string().max(120),            // one-liner for cards
    category: z.enum(['product', 'client', 'personal']),
    status: z.enum(['live', 'in-progress', 'archived']),
    featured: z.boolean().default(false),
    order: z.number(),
    year: z.string(),                        // "2024 – Present"
    role: z.string(),                        // "Founder & Full-stack Engineer"
    team: z.string().optional(),             // "Solo" / "3 engineers"
    stack: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    links: z.object({
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
      repoPrivate: z.boolean().default(false),
      caseStudyVideo: z.string().url().optional(),
    }),
    cover: image(),
    gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).optional(),
  }),
});
```

### 4.2 Project card (on `/work` and Home)

```
┌───────────────────────────────────────────────┐
│  [ screenshot, aspect-ratio 16/10, lazy ]     │
├───────────────────────────────────────────────┤
│  ● Live   Product · 2024 – Present            │
│  JEEArchive — Mock Test Platform              │
│  Scalable mock-test engine for JEE aspirants. │
│  [250K+ users] [7K DAU]                       │  ← metric chips
│  Next.js  Node  MongoDB  Redis  +2            │  ← stack chips
│  Read case study →        ↗ Live   🔒 Private │
└───────────────────────────────────────────────┘
```

- The whole card links to the case study; Live/Repo are secondary links with `aria-label`s.
- **Mobile**: single column, image on top with `aspect-ratio` (no fixed height), tagline always visible, chips wrap, tap targets ≥ 44px.
- **Desktop**: alternating large rows (image 60% / text 40%) for featured projects; 2-column grid for the rest. Optionally keep the "mac window" frame as a decorative wrapper around the screenshot.
- Hover: slight image lift/zoom and a "View case study" cursor label. Shared-element View Transition into the case study page.

### 4.3 Case study page template (`/work/<slug>`)

1. **Header**: title, tagline, status, links (Live / Repo / Private badge), cover image.
2. **Meta sidebar** (sticky on desktop, stacked on mobile): Role · Timeline · Team · Stack · Platform.
3. **Impact numbers**: 3–4 big metrics (users, DAU, Lighthouse score, load time, revenue/subscriptions if shareable).
4. **Overview / Problem**: who the users are and what pain you solved (2–3 short paragraphs).
5. **My role & approach**: what you owned end to end.
6. **Architecture**: a diagram (Excalidraw/SVG) of frontend ↔ API ↔ DB ↔ cache/CDN, plus key decisions and why ("chose ISR over SSR because…").
7. **Key features**: 3–6 features, each with a screenshot or short looping video (MP4/WebM, muted, lazy).
8. **Challenges & solutions**: the strongest section for interviews. Concrete problems (scaling, cost, SEO, payments, auth) and how you solved them, with numbers.
9. **Results**: before/after metrics, user feedback.
10. **What I learned / what I'd do differently.**
11. **Gallery**: mobile + desktop screenshots, lightbox.
12. **Next / previous project** navigation.

### 4.4 Content checklist per project (needs your input)

For each project, gather: real metrics (and where they come from), your exact role, timeline, 3–6 screenshots (desktop + mobile), one architecture sketch, 2–3 challenges with numbers, 1 short screen recording, and the live/repo links.

Suggested lineup and order: **JEEArchive (mock tests)** → **JEEArchive.in (materials, 250K users)** → **TradeJournalAI** → **Lawyal Tech (Contract Coder product tour)** → smaller personal projects (Gym site, etc.) in a compact "Other work" list without full case studies.

---

## 5. Mobile-specific fixes (Work page and overall)

- One responsive layout in normal flow. **Delete** all negative-margin and `.fade top` breakpoints, the `65vw` mac-section height, and `body { height: 200vh }`.
- Hero on mobile: reuse the same markup as desktop (no duplicate `.introduction` block). The mac frame can scale with `aspect-ratio` or simplify to a border on small screens.
- Project cards as described in §4.2: visible description, fluid image, 44px tap targets.
- Nav: show your name/logo on all sizes; `@` menu becomes an accessible `<button>` + a popover or sheet with focus trap, Esc/outside-click to close, and animated open/close.
- Sticky nav gets a translucent background + blur once scrolled (`.is-scrolled`), so content never collides with it.
- Use `100svh`/`100dvh` instead of `100vh` (fixes iOS Safari address-bar jumps).
- Respect safe-area insets (`env(safe-area-inset-*)`) for notched phones.
- Test matrix: 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920 px, plus iOS Safari and Android Chrome on a real device.

---

## 6. Performance plan (production-level)

1. **Images**: Astro `<Picture>` with `formats={['avif','webp']}`, `widths={[480, 800, 1200, 1600]}`, `sizes` set correctly. Hero/LCP image `loading="eager" fetchpriority="high"`; everything else lazy. Re-export source screenshots at 2400px max; crop the 1864×4096 portrait.
2. **Fonts**: self-hosted WOFF2, 2 weights of the sans (400/500) + 1 Gloock italic, `font-display: swap`, `preload` only the 400 weight, `size-adjust` fallback metrics to prevent layout shift on swap. Subset to Latin.
3. **JS**: zero JS by default. The only scripts: nav scrolled-state (~0.5 KB), menu popover (~1 KB), optional ⌘K island loaded `client:idle`. View Transitions are native.
4. **CSS**: one tokenized stylesheet, critical CSS inlined automatically by Astro, everything scoped per component; target < 20 KB.
5. **Third parties**: none on the critical path. Analytics loads `defer`.
6. **Caching** (`vercel.json`): `/_astro/*` and fonts → `max-age=31536000, immutable`; HTML → `max-age=0, must-revalidate`. Brotli is handled by Vercel.
7. **Rendering cost**: limit `backdrop-filter` to the nav; replace large blurred shadows with layered small ones or pre-rendered gradients; add `content-visibility: auto` to below-the-fold sections.
8. **Prefetch**: Astro `prefetch` on hover/viewport for internal links, so case studies open instantly.
9. **Guardrails**: Lighthouse CI in GitHub Actions with budgets (see §1.3) failing PRs that regress; Vercel Speed Insights for real-user data.

---

## 7. SEO, sharing and accessibility plan

**SEO**
- A `<SEO>` component per page: title template `"%s · Ayush Singh"`, description, canonical, OG/Twitter tags.
- **Auto-generated OG images** per page and case study (Astro + `satori`/`@vercel/og`) so links shared on LinkedIn/WhatsApp look great.
- JSON-LD: `Person` (name, jobTitle, alumniOf, sameAs: GitHub/LinkedIn/X) on Home; `CreativeWork`/`SoftwareApplication` on case studies.
- `@astrojs/sitemap`, `robots.txt`, SVG favicon + `apple-touch-icon` + manifest.
- Real `<h1>` per page and a meaningful heading hierarchy.

**Accessibility (target WCAG 2.2 AA)**
- Semantic landmarks, skip-to-content link, visible `:focus-visible` ring.
- `aria-label` on icon-only links; descriptive `alt` on every image (people photos and screenshots).
- Raise muted-text contrast to ≥ 4.5:1 (e.g. `#f2f2f2a6` instead of `#f2f2f266` on `#0e0e0e`).
- Menu: proper `<button aria-expanded aria-controls>`, focus trap, Esc to close.
- `prefers-reduced-motion` disables reveals and transitions.
- Automated checks with axe in CI, plus a manual keyboard-only pass and a VoiceOver pass.

---

## 8. Roadmap

| Phase | Scope | Est. effort |
|---|---|---|
| **0. Quick wins** (optional, on the current site, before the rebuild) | Fix broken `.screen` URL, load Gloock on Info, typos, malformed `</h3>`, footer `target`s, unify the 250K/500K figure, update bio year, compress the 3 heaviest images, lazy-load project images, remove extra preloads, add meta description + OG image, `.gitignore` + remove `.DS_Store`/unused assets | 0.5 day |
| **1. Content gathering** | Case-study content per §4.4, testimonials, achievements, updated resume PDF, headshot, decide on font licensing | 2–4 days (you) |
| **2. Foundation** | Astro setup, tokens, fonts, Base layout, Nav (accessible + scrolled state), Footer, SEO component, View Transitions, Vercel config | 2 days |
| **3. Work + Case studies** | Content collection + schema, ProjectCard, `/work` with filters, `/work/[slug]` template, gallery, mobile QA | 3 days |
| **4. Home + About + new sections** | Hero, stats strip, featured work, timeline, achievements, education, grouped skills, testimonials, now, contact form, 404 | 3 days |
| **5. Performance + SEO + a11y hardening** | Image pipeline tuning, OG image generation, JSON-LD, sitemap, axe fixes, reduced motion, Lighthouse CI | 1.5 days |
| **6. Polish + launch** | Motion details, ⌘K menu, cross-device QA, redirects (`/work.html` → `/work`, `/index.html` → `/about`), analytics, README refresh | 1.5 days |
| **7. Ongoing** | Write 1 post/month, add new projects as MDX files, check Speed Insights monthly | — |

**Definition of done**
- Lighthouse mobile ≥ 98 in all four categories on every page; CLS < 0.02.
- No horizontal scroll and no fixed section heights at any width from 320px to 2560px.
- Every project has a card with tagline + metrics + stack, and the top 4 have full case studies.
- No requests to third-party domains on initial load (except analytics, deferred).
- Keyboard-only navigation works everywhere; axe reports 0 violations.

---

## 9. Decisions needed from you

1. **Framework**: Astro (recommended) vs staying vanilla + Vite.
2. **Font**: buy/confirm a PP Neue Montreal licence, or switch to a free alternative (General Sans / Satoshi / Geist).
3. **Scope of new sections**: are Writing/blog and Testimonials in or out for v1?
4. **Positioning**: what you're targeting now (full-time SDE roles, freelance, internships), since it drives the hero copy and CTA.
5. Whether to do **Phase 0 quick wins** on the current site immediately, so it looks better while the rebuild happens.
