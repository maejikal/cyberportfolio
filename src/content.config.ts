import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    disclaimer: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/reviews" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/writeups" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
    description: z.string().optional(),
    ctfName: z.string().optional(),
    tags: z.array(z.string()).optional(),
    downloads: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })).optional(),
    disclaimer: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
  reviews: reviewsCollection,
  writeups: writeupCollection,
  projects: projectsCollection,
};
