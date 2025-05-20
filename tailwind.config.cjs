/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary) / 0.05)',
          100: 'rgb(var(--color-primary) / 0.1)',
          200: 'rgb(var(--color-primary) / 0.2)',
          300: 'rgb(var(--color-primary) / 0.3)',
          400: 'rgb(var(--color-primary) / 0.4)',
          500: 'rgb(var(--color-primary) / 0.6)',
          600: 'rgb(var(--color-primary) / 0.8)',
          700: 'rgb(var(--color-primary) / 0.9)',
          800: 'rgb(var(--color-primary) / 0.95)',
          900: 'rgb(var(--color-primary))',
        },
        secondary: {
          50: 'rgb(var(--color-secondary) / 0.05)',
          100: 'rgb(var(--color-secondary) / 0.1)',
          200: 'rgb(var(--color-secondary) / 0.2)',
          300: 'rgb(var(--color-secondary) / 0.3)',
          400: 'rgb(var(--color-secondary) / 0.4)',
          500: 'rgb(var(--color-secondary) / 0.6)',
          600: 'rgb(var(--color-secondary) / 0.8)',
          700: 'rgb(var(--color-secondary) / 0.9)',
          800: 'rgb(var(--color-secondary) / 0.95)',
          900: 'rgb(var(--color-secondary))',
        },
        background: '#F2EADF',
        text: '#70533A',
        gray: {
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
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        menu: ['Raleway', 'sans-serif'],
        body: ['Merriweather Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
