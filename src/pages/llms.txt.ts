import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
    const siteUrl =
        (site ?? new URL("https://reactiontimecheck.com")).href.replace(
            /\/$/,
            "",
        ) + "/";

    // Get all content entries
    const allContent = await getCollection("content");
    const allBlogs = await getCollection("blogs");

    // Filter out index.mdx and sort by path for consistent ordering
    const filteredContent = allContent
        .filter((doc) => doc.id !== "index.mdx")
        .sort((a, b) => a.id.localeCompare(b.id));

    // Build the llms.txt content
    let content = "# Reaction Time Test\n\n";
    content +=
        "> Free online reaction time test - Measure your reflex speed and improve your reaction time\n\n";
    content += "## About\n";
    content +=
        "Test your reaction speed instantly. Click when the screen turns green and measure your reflexes in milliseconds. Track your progress with analytics and compare your results.\n\n";
    content += "## Main Pages\n";

    for (const doc of filteredContent) {
        const title = doc.data.title || doc.id;
        const description = doc.data.description || "";
        const path = doc.id.replace(/\.mdx$/, "");
        const url = new URL(path, siteUrl).href;

        content += `- [${title}](${url}/)`;
        if (description) {
            content += ` - ${description}`;
        }
        content += "\n";
    }

    // Add blogs section
    if (allBlogs.length > 0) {
        content += "\n## Blog Posts\n";
        const filteredBlogs = allBlogs
            .filter((blog) => !blog.data.draft)
            .sort((a, b) => a.id.localeCompare(b.id));

        for (const blog of filteredBlogs) {
            const title = blog.data.title || blog.id;
            const description = blog.data.description || "";
            const path = `blogs/${blog.id.replace(/\.mdx?$/, "")}`;
            const url = new URL(path, siteUrl).href;

            content += `- [${title}](${url}/)`;
            if (description) {
                content += ` - ${description}`;
            }
            content += "\n";
        }
    }

    content += `\n\nGenerated on ${new Date().toISOString()}\n`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
