/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        'dark' : '#393838',
        'purple': '#4746B8',
        'orange': '#EB9124',
        'red': '#f8d7da',
        'gray': '#F5F5F7',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
