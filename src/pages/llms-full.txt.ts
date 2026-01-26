import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
    const siteUrl = context.site + "/";

    // Get all docs entries
    const allDocs = await getCollection("blogs");

    // Filter out index.mdx and sort by path for consistent ordering
    const filteredDocs = allDocs
        .filter((doc) => !doc.data.draft)
        .sort((a, b) => a.id.localeCompare(b.id));

    // Concatenate all document contents
    let concatenatedContent = "";

    for (const doc of filteredDocs) {
        const path = doc.id.replace(/\.mdx$/, "");
        const link = new URL(path, siteUrl).href;

        // Add a separator with the file path
        concatenatedContent += `\n${"=".repeat(80)}\n`;
        concatenatedContent += `Path: ${doc.id}\n`;
        concatenatedContent += `Link: ${link}\n`;
        concatenatedContent += `${"=".repeat(80)}\n\n`;

        // Add the document body
        concatenatedContent += doc.body;
        concatenatedContent += "\n\n";
    }

    return new Response(concatenatedContent, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
