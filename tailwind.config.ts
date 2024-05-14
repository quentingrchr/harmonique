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
        float: "float 22s ease-in-out infinite",
        floatReverse: "float 25s 1.5s ease-in-out infinite reverse",
        floatSlow: "float 30s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translate(15%, -10%)" },
          "20%": { transform: "translate(-30%, 20%)" },
          "30%": { transform: "translate(30%, -15%)" },
          "40%": { transform: "translate(-25%, 10%)" },
          "50%": { transform: "translate(25%, -25%)" },
          "60%": { transform: "translate(-10%, 30%)" },
          "70%": { transform: "translate(30%, -5%)" },
          "80%": { transform: "translate(-15%, 30%)" },
          "90%": { transform: "translate(10%, -30%)" },
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
