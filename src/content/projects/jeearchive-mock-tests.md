---
title: JEEArchive
tagline: A large-scale EdTech platform for JEE aspirants with previous-year questions, structured practice and full test series.
order: 1
category: Product
status: Live
year: '2026'
role: Founder & Frontend Developer
team: 3-person team
stack: [Next.js, TypeScript, Redux, Zustand, Tailwind CSS]
links:
  live: https://jeearchive.com
  repoPrivate: true
cover: ../../assets/projects/jeearchive-mock-tests/cover.webp
coverAlt: JEEArchive sign-in page previewing the real NTA exam interface
gallery:
  - src: ../../assets/projects/jeearchive-mock-tests/exam-interface.webp
    alt: JEEArchive mock test running in a replica of the NTA exam interface with sections, timer and question palette
    caption: Mock tests run in a pixel-accurate replica of the NTA exam interface, so the real exam feels familiar.
  - src: ../../assets/projects/jeearchive-mock-tests/dashboard.webp
    alt: JEEArchive dashboard with subject-wise progress, mock accuracy, average score and a performance trend chart
    caption: The dashboard tracks subject-wise progress, mock accuracy, average score and performance over time.
---

## Overview

JEEArchive is the next step after [JEEArchive.in](/work/jeearchive-materials). The study-materials site already reached 1.2M+ students. JEEArchive goes beyond reading material and gives them a place to actually *practice*: attempt questions and full mock tests exactly the way the real exam works.

It brings previous-year questions, chapter-wise practice and full mock tests together in one product, built by a **team of three**.

## My role

I'm the **founder and frontend developer**. I set the product direction and own the entire frontend: the exam interface, the test flows, the dashboard and everything students see and interact with.

## What I built on the frontend

- **A pixel-accurate NTA exam interface** in Next.js and TypeScript that replicates the real JEE portal, so the actual exam feels familiar. It helped onboard **1,000+ beta users** seamlessly.
- **A chapter-wise test module** with a timed paper flow, question navigation and an answer review panel, covering **16,484+ questions** across all JEE subjects.
- **A performance analytics dashboard** with charts for chapter-wise scores, accuracy trends and weak-area breakdowns for every session.
- **Complex test state, kept in sync.** The app consumes **50+ REST API endpoints**, with Zustand keeping test sessions, submissions and results consistent across components.

## Engineering focus

Performance was a product requirement, not a nice-to-have:

- fast loading and smooth navigation, even mid-test,
- a clean UI that helps students practice efficiently,
- a frontend architecture built to scale with a large student audience.

## Status

JEEArchive is live and under active development. The repository is private.
