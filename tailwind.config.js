// tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            primary: "#FAF7F3",
            secondary: "#F0E4D3",
            accent:"#c8611d",
            accentLight:"#c811d50"

          }
        },
      },
      plugins: [],
    };