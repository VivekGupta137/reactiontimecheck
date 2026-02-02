/**
 * RSS feed for blog posts
 * Automatically generates RSS XML for content discovery
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const blogs = await getCollection("blogs", ({ data }) => {
        // Filter out draft posts
        return !data.draft;
    });

    return rss({
        title: "Check Reaction Time Blog",
        description:
            "Tips, guides, and insights about improving reaction time and gaming performance",
        site: context.site!,
        items: blogs.map((post) => ({
            title: post.data.title,
            pubDate: new Date(), // Will update once publishDate is in schema
            description: post.data.description,
            link: `/blogs/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
