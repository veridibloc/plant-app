import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "veridibloc": "#38C400"
      },
      screens: {
        print: { raw: 'print'},
        screen: { raw: 'screen'}
      },
      fontFamily: {
        sans: [
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [require("preline/plugin")],
};

export default config;
