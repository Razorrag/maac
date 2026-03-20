/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // GREEN + RED + CRÈME theme — MAAC brand colours
      colors: {
        background: '#0a0a0a',    // Rich near-black (not flat #000)
        foreground: '#F5EFE0',    // Crème white — warm not cold

        // Card surfaces — DARK, not white/transparent
        surface: '#141414',
        'surface-hover': '#1e1e1e',

        // PRIMARY ACCENT — Vibrant MAAC Red
        accent: {
          DEFAULT: '#E8281C',     // MAAC brand red
          light: '#FF4438',       // Brighter hover red  
          glow: 'rgba(232, 40, 28, 0.4)',
        },

        // SECONDARY ACCENT — Creative Green
        green: {
          DEFAULT: '#22C55E',     // Vibrant creative green
          light: '#4ADE80',
          glow: 'rgba(34, 197, 94, 0.35)',
        },

        // CONTRAST ACCENT — Deep Violet / Ethereal Blue for subtle background glow
        contrast: {
          DEFAULT: '#8B5CF6',     // Violet matching new age vibes
          light: '#A78BFA',
          glow: 'rgba(139, 92, 246, 0.35)',
          blue: '#3B82F6',        // Ethereal Blue
          blueGlow: 'rgba(59, 130, 246, 0.35)',
        },

        // Crème tones for text hierarchy
        cream: {
          DEFAULT: '#F5EFE0',
          muted: '#C9BFA8',
          faint: '#7A6F60',
        },

        muted: '#8A7F72',
        border: '#2a2a2a',         // Solid dark border — not transparent
        'border-light': 'rgba(245, 239, 224, 0.1)',
      },

      // Typography
      fontFamily: {
        display: ['var(--font-anton)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-fast': 'marquee 15s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pan-grid': 'grid-pan 12s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'grid-pan': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4rem)' },
        }
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'snappy': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
};
