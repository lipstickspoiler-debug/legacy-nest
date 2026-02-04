/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.03em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "400" }],
                xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
                "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "600" }],
                "3xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
                "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
                "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
                "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
                "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.05em", fontWeight: "700" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.06em", fontWeight: "700" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.07em", fontWeight: "700" }],
            },
            fontFamily: {
                heading: ["baskervillemtw01-smbdit"],
                paragraph: ["azeret-mono"]
            },
            colors: {
                "soft-gold": "#B9B89A",
                sandstone: "#B9B89A",
                "deep-brown": "#2B2B2B",
                "off-white": "#B9B89A",
                destructive: "#DF3131",
                "destructive-foreground": "#FFFFFF",
                background: "#FFF9E9",
                secondary: "#2B2B2B",
                foreground: "#2B2B2B",
                "secondary-foreground": "#FFF9E9",
                "primary-foreground": "#FFF9E9",
                primary: "#2B2B2B",
                softblue: "#D6D9FF"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
