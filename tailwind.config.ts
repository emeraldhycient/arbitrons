import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: "#39FF14",
        neonPurple: "#B026FF",
        blackBg: "#111111", 
        darkBg: '#121212',
        cardBg: '#1E1E1E',
        lightText: '#E0E0E0',
        grayText: '#B3B3B3',
        highlight: '#3F3F3F',
        accent: '#FF0000',

      },
      keyframes: {
        'pulse-glow-sm': {
          '0%, 100%': { boxShadow: '0 0 3px #B026FF, 0 0 6px #B026FF' },
          '50%': { boxShadow: '0 0 6px #B026FF, 0 0 12px #B026FF' },
        },
      },
      animation: {
        'pulse-glow-sm': 'pulse-glow-sm 2s infinite',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
