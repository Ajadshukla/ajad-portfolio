/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif'],
      },
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          // Theme-aware: bright indigo on dark surfaces, deep indigo for contrast on light ones.
          300: 'rgb(var(--primary-300) / <alpha-value>)',
          400: 'rgb(var(--primary-400) / <alpha-value>)',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: '#10b981',
          600: '#059669',
        },
        // Theme-aware surface layers: near-black stack in dark mode, soft
        // lavender-white stack in light mode. Every `bg-dark-*`/`border-dark-*`
        // usage in the templates picks this up automatically.
        dark: {
          900: 'rgb(var(--surface-900) / <alpha-value>)',
          800: 'rgb(var(--surface-800) / <alpha-value>)',
          700: 'rgb(var(--surface-700) / <alpha-value>)',
          600: 'rgb(var(--surface-600) / <alpha-value>)',
          500: '#475569',
        },
        // The "strongest" foreground color on the page background — white in
        // dark mode, near-black in light mode. Used for headings/body text
        // that isn't sitting on a permanently-vivid gradient/button surface.
        ink: 'rgb(var(--ink) / <alpha-value>)',
        slate: {
          // Theme-aware: these are the shades this design actually uses for
          // text/borders on the page background. Untouched shades keep
          // Tailwind's stock slate palette.
          100: 'rgb(var(--slate-100) / <alpha-value>)',
          300: 'rgb(var(--slate-300) / <alpha-value>)',
          400: 'rgb(var(--slate-400) / <alpha-value>)',
          500: 'rgb(var(--slate-500) / <alpha-value>)',
          600: 'rgb(var(--slate-600) / <alpha-value>)',
          700: 'rgb(var(--slate-700) / <alpha-value>)',
        },
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.7s ease forwards',
        'fade-in':       'fadeIn 0.7s ease forwards',
        'slide-in-left': 'slideInLeft 0.7s ease forwards',
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'typing':        'typing 3.5s steps(40,end), blink .75s step-end infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%'  : { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%'  : { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%'  : { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-primary': 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
