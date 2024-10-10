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
      // colors: {
      //   primary: "#3490dc", // Customize the primary color (e.g., blue)
      //   "primary-foreground": "#ffffff", // Customize the text color for primary background if needed
      //   background: "#e5e5e5", // This is the custom background color
      //   foreground: "#3f3f46", // Custom text color for foreground
      //   // You can also add other colors like primary, secondary, etc.
      // },
    },
  },
  plugins: [],
};
export default config;
