/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        'primary': '#4746B8',
        'primary-hover': '#0C0B76',
        'secondary': '#EB9124',
        'secondary-hover': '#BD6800',
        'disabled': '#EDEDED',
        'negative': '#DB1F22',
        'success': '#36A56F',
        'background': '#F4EDE8',
        'dark' : '#393838',
        'red': '#f8d7da',
        'borderGray': '#EFE7DA',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
