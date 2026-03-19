/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // DNEG-inspired color palette
      colors: {
        // Off-white background (DNEG style)
        'dneg-white': '#F5F5F3',
        'dneg-off-white': '#EBEBE8',
        
        // Coral accent color
        'dneg-coral': '#FF6B4A',
        'dneg-coral-hover': '#E85A3A',
        
        // Neutral grays for text
        'dneg-black': '#1A1A1A',
        'dneg-gray': '#6B6B6B',
        'dneg-light-gray': '#9B9B9B',
      },
      
      // Typography
      fontFamily: {
        // Anton for headings (DNEG style)
        display: ['var(--font-anton)', 'system-ui', 'sans-serif'],
        // Inter for body text
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      
      // Spacing for touch targets (mobile optimization)
      spacing: {
        'touch': '44px', // Minimum touch target size
      },
      
      // Animation for micro-interactions
      transitionTimingFunction: {
        'dneg': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
