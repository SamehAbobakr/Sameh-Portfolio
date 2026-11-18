// Tailwind only maps utility names to the CSS variables defined in
// src/styles/tokens.css, so the design system has a single source of truth.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
// Same font sizes as Tailwind's defaults, but line-height comes from a token so Arabic can be taller.
const size = (rem, key) => [rem, { lineHeight: `var(--lh-${key})` }];

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    extend: {
      colors: {
        bg: v('bg'), surface: v('surface'), ink: v('ink'), muted: v('muted'),
        line: v('line'), primary: v('primary'), 'primary-ink': v('primary-ink'),
        secondary: v('secondary'), accent: v('accent'), danger: v('danger'),
      },
      fontFamily: { sans: ['var(--font-sans)'], display: ['var(--font-display)'] },
      fontSize: {
        xs: size('0.75rem', 'xs'), sm: size('0.875rem', 'sm'), base: size('1rem', 'base'),
        lg: size('1.125rem', 'lg'), xl: size('1.25rem', 'xl'), '2xl': size('1.5rem', '2xl'),
        '3xl': size('1.875rem', '3xl'), '4xl': size('2.25rem', '4xl'), '5xl': size('3rem', '5xl'),
        '6xl': size('3.75rem', '6xl'), '7xl': size('4.5rem', '7xl'),
      },
      lineHeight: { display: 'var(--lh-display)' },
      letterSpacing: { tight: 'var(--ls-tight)', widest: 'var(--ls-widest)' },
      borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)' },
      boxShadow: { soft: 'var(--shadow-soft)', glow: 'var(--glow)' },
      transitionDuration: { base: 'var(--duration)' },
    },
  },
  plugins: [],
};
