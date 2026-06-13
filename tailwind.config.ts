import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ludora Dark Signal palette
        primary: '#f2c12e',       // vivid amber-yellow — accent
        secondary: '#666666',     // muted gray — secondary text / buttons
        tertiary: '#374151',      // dark slate — structural borders
        base: '#080808',          // near-black — page background (DESIGN: neutral)
        surface: '#111111',       // slightly lifted — cards / inputs
        'on-surface': '#efefef',  // near-white — body text
        error: '#ef4444',         // red — error / destructive states
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
