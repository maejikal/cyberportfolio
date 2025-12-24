import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    lastUpdated: z.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    disclaimer: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    lastUpdated: z.date().optional(),
    description: z.string().optional(),
    category: z.enum(['module', 'book', 'tool', 'resource', 'other']),
    moduleCode: z.string().optional(),
    semester: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    tags: z.array(z.string()).optional(),
    disclaimer: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const writeupCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    lastUpdated: z.date().optional(),
    description: z.string().optional(),
    ctfName: z.string().optional(),
    tags: z.array(z.string()).optional(),
    disclaimer: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
  reviews: reviewsCollection,
  writeups: writeupCollection,
};