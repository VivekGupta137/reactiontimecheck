import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const content = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
    }),
});

const blogs = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pageTitle: z.string().optional(),
        publishDate: z
            .date()
            .optional()
            .default(() => new Date()),
        updatedOn: z.date().optional(),
        draft: z.boolean().optional(),
    }),
});

export const collections = { content, blogs };
