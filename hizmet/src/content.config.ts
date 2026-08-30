import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({ title: z.string(), description: z.string().optional(), pubDate: z.coerce.date().optional(), author: z.string().optional() }),
});

// Every Markdown file under src/content is also available through the generic
// route. This keeps new CMS-created folders (for example
// src/content/projelerimiz) routable without requiring a new Astro collection
// and page file for each folder.
const siteContent = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
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
