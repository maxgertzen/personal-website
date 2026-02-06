import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-major-mono)', 'monospace'],
        body: ['var(--font-josefin-sans)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.125rem', { lineHeight: '1' }],
        'hero-lg': ['8rem', { lineHeight: '1' }],
        'section-title': ['1.75rem', { lineHeight: '1.2' }],
        'section-title-lg': ['2.25rem', { lineHeight: '1.2' }],
        'subtitle': ['1.125rem', { lineHeight: '1.4' }],
        'subtitle-lg': ['2.25rem', { lineHeight: '1.3' }],
        'body-lg': ['1.5rem', { lineHeight: '2.5rem' }],
        'skill-heading': ['1.5rem', { lineHeight: '1.3' }],
      },
      spacing: {
        'section-gap': '3rem',
        'section-gap-lg': '6rem',
        'section-gap-xl': '10rem',
      },
      colors: {
        brand: 'hsl(var(--color-brand) / <alpha-value>)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config;