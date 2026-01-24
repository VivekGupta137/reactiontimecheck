import type { APIRoute } from "astro";
import sharp from "sharp";

const pages = {
    home: {
        title: "Reaction Time Check",
        description:
            "Test Your Gaming Reflexes Online - Free Reaction Speed Test",
    },
    "reaction-time-test": {
        title: "Reaction Time Test",
        description:
            "Measure Your Gaming Reflexes Response Speed in Milliseconds",
    },
    analytics: {
        title: "Analytics Dashboard",
        description: "Track Your Reaction Time Performance Trends Over Time",
    },
    tips: {
        title: "How to Improve Reaction Time",
        description: "Proven Tips Training to Boost Your Gaming Reflexes",
    },
    about: {
        title: "About Reaction Time Check",
        description: "Free Reaction Time Tests Brain Training Tools",
    },
};

const escape = (text: string) =>
    text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const createSVG = (title: string, description: string) => {
    const words = title.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (test.length > 20) {
            if (line) lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);

    return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#06b6d4"/>
            <stop offset="100%" stop-color="#0d9488"/>
        </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="url(#bg)"/>
    
    <circle cx="1000" cy="520" r="180" fill="#14b8a6" opacity="0.04"/>
    
    <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>
    
    ${lines
        .map(
            (line, i) => `
    <text x="70" y="${lines.length > 1 ? 200 + i * 90 : 230}" font-family="Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="88" font-weight="900" fill="#ffffff" letter-spacing="-3">
        ${escape(line)}
    </text>`,
        )
        .join("")}
    
    <text x="70" y="${lines.length > 1 ? 450 : 360}" font-family="Inter,system-ui,-apple-system,sans-serif" font-size="34" font-weight="500" fill="#e2e8f0" letter-spacing="0.2">
        ${escape(description)}
    </text>
    
    <rect x="70" y="${lines.length > 1 ? 485 : 400}" width="80" height="3" fill="#14b8a6" opacity="0.7" rx="1.5"/>
</svg>`;
};

export const getStaticPaths = () =>
    Object.keys(pages).map((route) => ({ params: { route: `${route}.png` } }));

export const GET: APIRoute = async ({ params }) => {
    const routeName = params.route?.replace(".png", "") || "home";
    const page = pages[routeName as keyof typeof pages];
    if (!page) return new Response("Not found", { status: 404 });

    const svg = createSVG(page.title, page.description);
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(png as BodyInit, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
};
