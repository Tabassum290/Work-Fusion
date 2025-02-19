/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Your root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All React components
  ],
  theme: {
    extend: {}, // Extend theme if needed
  },
  darkMode: 'class', 
  plugins: [
    require("daisyui"), // DaisyUI for pre-built UI components
  ],
};
