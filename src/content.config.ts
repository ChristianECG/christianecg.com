import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    source: z.enum(['Blog', 'Octa']),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

const bio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bio' }),
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    description: z.string().optional(),
  }),
});

export const collections = { blog, projects, bio };
