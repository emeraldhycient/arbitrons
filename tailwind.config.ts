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
        neonPurple: "#B026FF", // Add neon purple color
        blackBg: "#111111", // Dark black for background
      },
      keyframes: {
        'pulse-glow-sm': {
          '0%, 100%': { boxShadow: '0 0 6px #B026FF, 0 0 12px #B026FF' },
          '50%': { boxShadow: '0 0 12px #B026FF, 0 0 24px #B026FF' },
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
