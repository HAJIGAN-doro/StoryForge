/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C42',
          dark: '#E67A35',
          light: '#FFB380',
        },
        secondary: {
          DEFAULT: '#4A90A4',
          dark: '#3A7A8A',
          light: '#6BB0C4',
        },
        background: {
          light: '#F5F5F5',
          dark: '#1A1A1A',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#2D2D2D',
        },
        'text-primary': {
          light: '#333333',
          dark: '#E5E5E5',
        },
        'text-secondary': {
          light: '#666666',
          dark: '#A0A0A0',
        },
        border: {
          light: '#E0E0E0',
          dark: '#404040',
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'btn': '8px',
        'card': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
