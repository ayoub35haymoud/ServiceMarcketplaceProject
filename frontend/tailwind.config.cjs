module.exports = {
  content: [
    "./index.html",  // Make sure it points to your HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // Include your React or other components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
