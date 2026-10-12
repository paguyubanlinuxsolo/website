import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const common = {
  title: z.string(),
  slug: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Paguyuban Linux Solo'),
  description: z.string().default(''),
  heroImage: z.string().optional(),
  draft: z.boolean().default(false),
};

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object(common),
});

const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    photo: z.string().optional(),
    bio: z.string().default(''),
    github: z.string().optional(),
    telegram: z.string().optional(),
    website: z.string().optional(),
  }),
});

export const collections = { posts, pages, authors };
