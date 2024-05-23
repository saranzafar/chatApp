/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFFFF', // White
          100: '#F9FAFB',
          200: '#F3F4F6',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937', // Very dark gray (almost black)
        },
        secondary: {
          50: '#F9FAFB', // Very light gray
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827', // Black
        },
        accent: {
          50: '#E0E7FF', // Light blue
          100: '#C7D2FE',
          200: '#A5B4FC',
          300: '#818CF8',
          400: '#6366F1',
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3',
          800: '#312E81',
          900: '#1E3A8A', // Dark blue
        },
      },
    },
  },
  plugins: [],
}
