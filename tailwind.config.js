/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gradientColorStopPositions: {
        instagram:
          'border-gradient-to-r from-indigo-500 via-purple-500  to-yellow-500',
      },
    },
  },
  plugins: [],
};
