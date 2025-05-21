/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCDEFF',
          200: '#99BDFF',
          300: '#669CFF',
          400: '#337BFF',
          500: '#005AFF', // Main primary color
          600: '#0048CC',
          700: '#003699',
          800: '#002466',
          900: '#001233',
        },
        secondary: {
          50: '#E6F6FF',
          100: '#B3E0FF',
          200: '#80CAFF',
          300: '#4DB3FF',
          400: '#1A9DFF',
          500: '#0087E6',
          600: '#006BB8',
          700: '#00508A',
          800: '#00345C',
          900: '#00192E',
        },
        accent: {
          50: '#FFF3E6',
          100: '#FFE0B3',
          200: '#FFCD80',
          300: '#FFB94D',
          400: '#FFA61A',
          500: '#E68A00',
          600: '#B36E00',
          700: '#805100',
          800: '#4D3300',
          900: '#1A1200',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px
        '8': '2rem',    // 32px
        '10': '2.5rem', // 40px
        '12': '3rem',   // 48px
        '16': '4rem',   // 64px
      },
    },
  },
  plugins: [],
}