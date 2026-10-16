import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '390px', // Mobile reference per LankaDirect spec
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px', // Desktop reference per LankaDirect spec
    },
    extend: {
      colors: {
        brand: {
          primary: '#F97316', // Orange-500
          hover: '#EA580C',   // Orange-600
          bg: '#F8FAFC',      // Slate-50
          surface: '#FFFFFF', // Pure White
          text: '#111827',    // Gray-900
          muted: '#64748B',   // Slate-500
          border: '#E2E8F0',  // Slate-200
          subtle: '#F1F5F9',  // Slate-100
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
