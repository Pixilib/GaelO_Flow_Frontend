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
        'orange': '#EB9124',
        'orange-hover': '#BD6800',
        'dark' : '#393838',
        'red': '#f8d7da',
        'gray': '#EFEFEF', 
        'light': '#F1F1F1'
      },
      boxShadow: {
        'custom': '11px 17px 15px rgba(58, 51, 51, 0.37)',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
