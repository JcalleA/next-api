import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation:{
        "pulse-fade-in": "pulse-fade-in 0.6s ease-out",
        "blurred-fade-in": "blurred-fade-in 0.4s ease-in-out",
      },
      keyframes:{
        "blurred-fade-in": {
          "0%": {
            "filter": "blur(5px)",
            "opacity": "0"
          },
          "100%": {
            "filter": "blur(0)",
            "opacity": "1"
          }
        },
        "pulse-fade-in": {
          "0%": {
            "transform": "scale(0.9)",
            "opacity": "0"
          },
          "50%": {
            "transform": "scale(1.05)",
            "opacity": "0.5"
          },
          "100%": {
            "transform": "scale(1)",
            "opacity": "1"
          }
        }
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
