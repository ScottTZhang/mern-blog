import flowbiteReact from "flowbite-react/plugin";
//import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
}