import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sacramento: "#162114",
        pine: "#294122",
        salmon: "#FFBBA6",
        tangerine: "#EB3D00",
        chiffon: "#FFEDD2",
      },
    },
  },
  plugins: [],
};
export default config;
