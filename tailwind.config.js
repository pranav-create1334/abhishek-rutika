/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbf6ec',
        cream: '#f6ecda',
        'cream-deep': '#efe0c8',
        wine: '#4b0e1a',
        'wine-deep': '#2b0710',
        'wine-soft': '#661a29',
        maroon: '#3d0913',
        gold: '#c9a25c',
        'gold-light': '#e7cd96',
        'gold-deep': '#9a7127',
        'gold-ink': '#7a551b',
        haldi: '#dfa62c',
        marigold: '#e2872a',
        leaf: '#69764f',
        ink: '#332120',
        muted: '#715451',
        rose: '#a5575c',
      },
      fontFamily: {
        mr: ['Mukta', '"Tiro Devanagari Marathi"', 'sans-serif'],
        'mr-display': ['"Tiro Devanagari Marathi"', '"Cormorant Garamond"', 'serif'],
        en: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        ui: ['Mukta', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        card: '560px',
      },
      letterSpacing: {
        widest: '0.26em',
      },
      boxShadow: {
        card: '0 28px 80px -28px rgba(43, 7, 16, 0.5)',
        glow: '0 0 60px rgba(223, 166, 44, 0.25)',
      },
      keyframes: {
        'petal-fall': {
          '0%': { opacity: '0', transform: 'translate3d(0, -8vh, 0) rotate(0deg)' },
          '10%': { opacity: '0.5' },
          '85%': { opacity: '0.35' },
          '100%': { opacity: '0', transform: 'translate3d(var(--petal-drift, 20px), 108vh, 0) rotate(540deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.75', transform: 'scale(1) translateY(0)' },
          '35%': { opacity: '1', transform: 'scale(1.06) translateY(-1px)' },
          '70%': { opacity: '0.82', transform: 'scale(0.97) translateY(0.5px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-0.6deg)' },
          '50%': { transform: 'rotate(0.6deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        'seal-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 92, 0.32)' },
          '50%': { boxShadow: '0 0 0 14px rgba(201, 162, 92, 0)' },
        },
        'bars-one': {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'soft-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'chevron-drift': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
      },
      animation: {
        flicker: 'flicker 3.8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 5s ease-in-out infinite',
        sway: 'sway 7s ease-in-out infinite',
        'seal-pulse': 'seal-pulse 2.8s ease-out infinite',
        'chevron-drift': 'chevron-drift 2s ease-in-out infinite',
        'soft-in': 'soft-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
