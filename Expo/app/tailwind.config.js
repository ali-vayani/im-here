/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'text': "#06031f",
        'background': "#f4f4fe",
        'primary': "#5147c2",
        'secondary': "#d8d89f",
        'accent': "#ed7e58",
        
      },      
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
