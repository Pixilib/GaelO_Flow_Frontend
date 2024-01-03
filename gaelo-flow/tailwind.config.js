/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'purpleCustom':'#4746B8'
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

