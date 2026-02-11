import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    order: z.number().optional(),
    type: z.enum(['page', 'guide', 'post']).default('post'),
    toc: z.boolean().default(true),
  }),
});

export const collections = { articles };
