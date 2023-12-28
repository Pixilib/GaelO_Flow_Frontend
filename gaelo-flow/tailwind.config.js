/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        'dark' : '#393838',
        'purple': '#4746B8',
        'background': '#F4EDE8',
        'red': '#f8d7da',
        'borderGray': '#EFE7DA',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
