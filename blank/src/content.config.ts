import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }).passthrough(),
});

// The generic collection lets TuranCMS add folders such as
// src/content/services or src/content/projects without requiring a code
// change for every new collection.
const siteContent = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
  schema: z.object({
    title: z.string().optional(),
    seoTitle: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }).passthrough(),
});

export const collections = { blog, siteContent };
