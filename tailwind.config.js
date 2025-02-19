/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Your root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All React components
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React components
    "node_modules/flowbite/**/*.js", // Flowbite's core JS
  ],
  theme: {
    extend: {}, // Extend theme if needed
  },
  darkMode: 'class', 
  plugins: [
    require("daisyui"), // DaisyUI for pre-built UI components
    require("flowbite/plugin"), // Flowbite plugin
  ],
};
