/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        '70': '70px',
      },
      colors: {
        'primary': '#4746B8',
        'primary-hover': '#0C0B76',
        'secondary': '#EB9124',
        'secondary-hover': '#BD6800',
        'danger': '#DB1F22',
        'danger-hover': '#9F181A',
        'success': '#36A56F',
        'success-hover': '#276A4A',
        'orange': '#F4EDE8',
        'dark' : '#393838',
        'red': '#f8d7da',
        'gray': '#AFB2C3',
        'light': '#F1F1F1'
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
