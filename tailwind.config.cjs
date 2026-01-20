// tailwind.config.cjs
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,mjs}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {},
                },
            }),
        },
    },
    darkMode: "class",

    plugins: [
        heroui({
            defaultTheme: "dark",
            addCommonColors: true,

            prefix: "vg-",
            layout: {},
        }),
    ],
};
