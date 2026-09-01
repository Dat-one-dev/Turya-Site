import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#060606",
        paper: "#f2f0e8",
        fog: "#a5a49e",
        line: "rgba(242, 240, 232, .24)",
      },
    },
  },
  plugins: [],
};

export default config;
