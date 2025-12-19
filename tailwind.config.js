/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kasibet': {
          'bg-primary': '#0d0d0d',
          'bg-card': '#111',
          'bg-modal': '#1a1a1a',
          'border': '#1f2937',
          'accent': '#eab308',
          'accent-hover': '#ca8a04',
          'accent-light': '#fde047',
          'text-primary': '#ffffff',
          'text-secondary': '#9ca3af',
          'text-muted': '#6b7280',
          'success': '#10b981',
          'danger': '#dc2626',
          'warning': '#f59e0b',
        },
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'mono': ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Roboto Mono"', 'Consolas', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}

