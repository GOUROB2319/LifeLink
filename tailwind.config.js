/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399'
        },
        emergency: '#DC2626'
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
        bengali: ['Hind Siliguri', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
