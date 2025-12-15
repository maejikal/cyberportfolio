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

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    link: z.string().optional(),
    skills: z.array(z.string()).optional(),
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
  projects: projectsCollection,
  writeups: writeupCollection,
};