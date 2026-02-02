/**
 * Font configuration for Astro Font
 * Optimizes Google Fonts loading with preload and display swap
 */
export const fontConfig = [
    {
        name: "Atkinson Hyperlegible",
        src: [],
        googleFontsURL:
            "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap",
        preload: true,
        display: "swap",
        fallback: "sans-serif",
    },
    {
        name: "JetBrains Mono",
        src: [],
        googleFontsURL:
            "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
        preload: true,
        display: "swap",
        fallback: "monospace",
    },
];
