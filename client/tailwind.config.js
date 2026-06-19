/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Allow triggering dark mode elements if needed (always dark by default)
  theme: {
    extend: {
      colors: {
        music: {
          black: '#09090b',       // bg-zinc-950
          charcoal: '#18181b',    // bg-zinc-900
          card: '#242427',        // custom card dark
          purple: {
            light: '#c084fc',     // text-purple-400
            DEFAULT: '#8b5cf6',   // text-purple-500
            dark: '#6d28d9',      // text-purple-700
            glow: 'rgba(139, 92, 246, 0.15)'
          },
          gold: {
            light: '#fde047',     // yellow-300
            DEFAULT: '#fbbf24',   // amber-400
            dark: '#d97706',      // amber-600
            glow: 'rgba(251, 191, 36, 0.15)'
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'soundwave': 'soundwave 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        soundwave: {
          '0%': { height: '10%' },
          '100%': { height: '100%' }
        }
      }
    },
  },
  plugins: [],
}
