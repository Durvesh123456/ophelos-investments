/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.03em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
                xl: ["1.25rem", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "600" }],
                "2xl": ["1.5rem", { lineHeight: "1.3", letterSpacing: "0em", fontWeight: "600" }],
                "3xl": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
                "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
                "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
                "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "700" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.06em", fontWeight: "700" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.07em", fontWeight: "700" }],
            },
            fontFamily: {
                heading: ["playfair display"],
                paragraph: ["open sans"]
            },
            colors: {
                foreground: "#0C4A6E",
                background: "#F0F9FF",
                secondary: "#E0F2FE",
                "secondary-foreground": "#0C4A6E",
                "primary-foreground": "#FFFFFF",
                primary: "#0EA5E9",
                contentblockbackground: "#F0F9FF",
                buttonborder: "#0EA5E9",
                "secondary-foreground-alt": "#1E293B"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
