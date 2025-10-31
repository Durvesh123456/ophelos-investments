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
                foreground: "#FFFFFF",
                background: "#000000",
                secondary: "#1A1A1A",
                "secondary-foreground": "#FFFFFF",
                "primary-foreground": "#FFFFFF",
                primary: "#FFFFFF",
                contentblockbackground: "#000000",
                buttonborder: "#FFFFFF",
                "secondary-foreground-alt": "#CCCCCC",
                // Black and white accent colors
                neon: {
                    cyan: "#FFFFFF",
                    purple: "#CCCCCC",
                    pink: "#DDDDDD",
                    green: "#EEEEEE",
                    blue: "#F5F5F5",
                },
                dark: {
                    900: "#000000",
                    800: "#1A1A1A",
                    700: "#333333",
                    600: "#4A4A4A",
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'neon-glow': 'linear-gradient(45deg, #FFFFFF, #CCCCCC, #DDDDDD)',
                'cyber-grid': 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            },
            animation: {
                'pulse-neon': 'pulse-neon 3s ease-in-out infinite alternate',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'cyber-scan': 'cyber-scan 4s linear infinite',
                'subtle-glow': 'subtle-glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                'pulse-neon': {
                    '0%': { 
                        boxShadow: '0 0 3px rgba(255, 255, 255, 0.3), 0 0 6px rgba(255, 255, 255, 0.2)',
                        textShadow: '0 0 3px rgba(255, 255, 255, 0.4)'
                    },
                    '100%': { 
                        boxShadow: '0 0 6px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.3)',
                        textShadow: '0 0 6px rgba(255, 255, 255, 0.5)'
                    }
                },
                'subtle-glow': {
                    '0%': { 
                        textShadow: '0 0 2px rgba(255, 255, 255, 0.3)'
                    },
                    '100%': { 
                        textShadow: '0 0 4px rgba(255, 255, 255, 0.4)'
                    }
                },
                'glow': {
                    '0%': { filter: 'brightness(1) saturate(1)' },
                    '100%': { filter: 'brightness(1.1) saturate(1.2)' }
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
                'neon': '0 0 3px rgba(255, 255, 255, 0.4), 0 0 6px rgba(255, 255, 255, 0.3)',
                'neon-lg': '0 0 6px rgba(255, 255, 255, 0.5), 0 0 12px rgba(255, 255, 255, 0.4)',
                'cyber': '0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.05)',
                'soft-glow': '0 0 8px rgba(255, 255, 255, 0.2), 0 0 16px rgba(255, 255, 255, 0.1)',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
