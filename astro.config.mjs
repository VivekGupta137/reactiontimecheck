// @ts-check
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

import tailwindcss from "@tailwindcss/vite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

import compress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: "https://checkreactiontime.com",

    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        rehypePlugins: [
            rehypeHeadingIds,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "append",
                    headingProperties: {
                        className: "group relative",
                    },
                    properties: {
                        className:
                            "ml-2 no-underline invisible group-hover:visible ",
                    },

                    content: [
                        {
                            type: "element",
                            tagName: "span",

                            children: [{ type: "text", value: "#" }],
                        },
                    ],
                },
            ],
        ],
    },

    integrations: [
        react(),
        mdx(),
        sitemap(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
        compress({
            CSS: true,
            HTML: true,
            Image: true,
            JavaScript: true,
            SVG: true,
        }),
    ],
    build: {
        concurrency: 20,
    },
});
