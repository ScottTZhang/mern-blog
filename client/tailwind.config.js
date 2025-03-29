import flowbiteReact from "flowbite-react/plugin";

/** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // Correct path for flowbite-react
    "./node_modules/flowbite-react/**/*.js",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
}