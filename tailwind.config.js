/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js"
  ],
  theme: {
    prefix: 'hs-', // Custom prefix for all Tailwind classes
    extend: {
      fontSize: {
        '10': '10px',
      },
      borderRadius: {
        '18': '18px',
        '20': '20px',
        '40': '40px',
        '70': '70px',
      },
      height: {
        '5%': '5%',
        '10%': '10%',
        '11%': '11%',
        '12%': '12%',
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
        '64%': '64%',
        '65%': '65%',
        '69%': '69%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '85%': '85%',
        '90%': '90%',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      colors: {
        'almond': '#F7E9D8',
        'almond-hover': '#F6D1A7',
        'primary': '#4746B8',
        'primary-active': '#333182',
        'primary-light': '#8C8BD3',
        'secondary': '#EB9124',
        'secondary-hover': '#BD6800',
        'danger': '#DB1F22',
        'danger-hover': '#8A1315',
        'success-light': '#CBDCD4',
        'success': '#037F6E',
        'success-hover': '#2E7058',
        'disabled': '#b2b2b2',
        'warning': '#DDAD00',
        'warning-hover': '#A88400',
        'dark': '#484544',
        'blue-custom': '#2F77BA',
        'blue-custom-hover': '#245D92',
        'gray-custom': '#D4CFCF',
        'light': '#FFFFFF',
        'light-gray': '#EFEFEF',
      },
      boxShadow: {
        'custom': '5px 17px 15px rgba(58, 51, 51, 0.20)',
      },
      animation: {
        'typing': 'typing 3s steps(30) 1s 1 normal both',
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('preline/plugin'),
  ],
};
