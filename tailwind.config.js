/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        '20': '20px',
        '40': '40px',
        '70': '70px',
      },
      height: {
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',
        '35%': '35%',
        '40%': '40%',
        '45%': '45%',
        '50%': '50%',
        '55%': '55%',
        '60%': '60%',
        '65%': '65%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '85%': '85%',
        '90%': '90%',

      },
      borderWidth: {
        '1,5': '1.5px',
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
        'orange': '#DFB520',
        'orange-hover': '#9C7F15',
        'dark': '#393838',
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
