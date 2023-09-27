/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xxs: '0.6rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: {
          100: '#FFF3F0',
          200: '#FF9182',
          999: '#FF452D',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          450: '#6b6b76',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        orange: {
          100: '#fd7361',
          200: '#fc604b',
          300: '#ff6b57',
          400: '#ff6551',
          450: '#fc5b00',
          500: '#ff5f4a',
          550: '#fc3f00',
          600: '#FF452D',
        },
        pink: {
          100: '#FFF3F0',
          200: '#ffdddb',
        },
        grey: {
          100: '#686868',
          200: 'rgba(255, 255, 255, 0.2)',
          300: '#666666',
        },
        dark: {
          100: 'rgb(0, 0, 0, 0.1)',

          900: 'rgb(0, 0, 0, 1)',
        },
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: ['@tailwindcss/aspect-ratio'],
};
