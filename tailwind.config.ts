import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 5s ease-in-out infinite",
        floatReverse: "float 5s 1.5s ease-in-out infinite reverse",
        floatSlow: "float 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translate(-25%, -10%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          50: "#E5E5E5",
          100: "#383838",
          200: "#343434",
          300: "#333333",
          400: "#2D2D2D",
          500: "#2C2C2C",
          600: "#272727",
          700: "#242424",
          800: "#222222",
          900: "#1E1E1E",
          950: "#121212",
        },

        text: "#FFFFFF",
        "muted-text": "#919191",
        // brand: "#FFC107",
        brand: "#9333ea",
      },
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
