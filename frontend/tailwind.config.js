/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      title: ["Trap"],
      primary: ["Roobert"],
    },
    keyframes: {
      float: {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(-20px)" },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
    },
    animation: {
      float: "float 2s infinite alternate",
      wiggle: "wiggle 1s ease-in-out infinite",
    },
  },
  plugins: [],
};
