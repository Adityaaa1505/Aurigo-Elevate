/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html", // Path to your HTML file
      "./src/**/*.{js,ts,jsx,tsx}", // Include all component files in the src folder
    ],
    theme: {
      extend: {
        colors: {
          dBlue: "#0B1A36", // Your custom color
        },
      },
    },
    plugins: [],
  };
  