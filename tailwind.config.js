/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,css}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      spacing: {
        'without-header': 'var(--full-vh-minus-header)',
      },
      minHeight: {
        'without-header': 'var(--full-vh-minus-header)',
      },
    },
  },
  plugins: [],
}
