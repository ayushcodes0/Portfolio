import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One-liner used on cards and as the meta description of the case study.
      tagline: z.string().max(200),
      order: z.number(),
      category: z.enum(['Internship', 'Product', 'Client work', 'Personal']),
      status: z.enum(['Live', 'In progress', 'Offline', 'Archived']),
      year: z.string().optional(),
      role: z.string(),
      team: z.string().optional(),
      stack: z.array(z.string()).default([]),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      links: z.object({
        live: z.url().optional(),
        repo: z.url().optional(),
        repoPrivate: z.boolean().default(false),
      }),
      // Optional: projects without a screenshot (e.g. internal work) get a typographic cover.
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Extra screenshots shown on the case study page.
      gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
    }),
});

export const collections = { projects };
