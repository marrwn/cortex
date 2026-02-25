/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixelify)", "sans-serif"], // <--- Must be exactly the same
      },
    },
  },
};
