/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        canvas: '#F8FAFC',
        dribbble: {
          pink: '#EA4C89',
          pinkLight: '#FDE8F0',
          pinkHover: '#F082AC',
          pinkDark: '#D43775',
          black: '#0D0C22',
          gray: '#6E6D7A',
          border: '#E7E7E9',
          pillBg: '#F3F3F4',
          pillHover: '#EBEBEB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          hover: '#F8FAFC',
          dark: '#0D0C22',
        },
        traffic: {
          low: '#10B981',
          medium: '#F59E0B',
          high: '#F97316',
          critical: '#EF4444',
          emergency: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'dribbble': '0 12px 32px 0 rgba(0, 0, 0, 0.06)',
        'dribbble-hover': '0 20px 40px 0 rgba(0, 0, 0, 0.12)',
        'dribbble-pill': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'glow-pink': '0 0 20px -3px rgba(234, 76, 137, 0.45)',
        'glow-primary': '0 0 20px -3px rgba(99, 102, 241, 0.35)',
      },
    },
  },
  plugins: [],
}
