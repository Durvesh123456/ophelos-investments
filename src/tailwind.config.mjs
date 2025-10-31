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
                paragraph: ["open sans"],
                roboto: ["roboto", "sans-serif"]
            },
            colors: {
                foreground: "#E0E7FF",
                background: "#0F0F23",
                secondary: "#1A1A2E",
                "secondary-foreground": "#E0E7FF",
                "primary-foreground": "#0F0F23",
                primary: "#00FFFF",
                contentblockbackground: "#0F0F23",
                buttonborder: "#00FFFF",
                "secondary-foreground-alt": "#A855F7",
                // Futuristic accent colors
                neon: {
                    cyan: "#00FFFF",
                    purple: "#A855F7",
                    pink: "#EC4899",
                    green: "#10B981",
                    blue: "#3B82F6",
                },
                dark: {
                    900: "#0F0F23",
                    800: "#1A1A2E",
                    700: "#16213E",
                    600: "#0E4B99",
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'neon-glow': 'linear-gradient(45deg, #00FFFF, #A855F7, #EC4899)',
                'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
            },
            animation: {
                'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'cyber-scan': 'cyber-scan 3s linear infinite',
            },
            keyframes: {
                'pulse-neon': {
                    '0%': { 
                        boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
                        textShadow: '0 0 5px #00FFFF'
                    },
                    '100%': { 
                        boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
                        textShadow: '0 0 10px #00FFFF'
                    }
                },
                'glow': {
                    '0%': { filter: 'brightness(1) saturate(1)' },
                    '100%': { filter: 'brightness(1.2) saturate(1.3)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'cyber-scan': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100vw)' }
                }
            },
            boxShadow: {
                'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
                'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
                'cyber': '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
