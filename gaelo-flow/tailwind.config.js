/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-gradient":
          "linear-gradient(90deg, #343375 6.36%, rgba(98, 71, 101, 0.96) 33.54%, rgba(202, 135, 77, 0.99) 66.93%, #FFA840 73.7%, rgba(251, 165, 65, 1.00) 75.92%)",
      }),
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

//TODO : [] adapt gradient to looks like the figma
