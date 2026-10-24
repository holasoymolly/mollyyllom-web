import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pageComponents/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/cv/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'Arial', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '-14': '-3.5rem',
        '-16': '-4rem',
        '-20': '-5rem',
        '-21': '-5.25rem', // Valor ajustado entre -20 y -22
        '-22': '-5.5rem',
        '-24': '-6rem',
        '-28': '-7rem',
        '-32': '-8rem',
        '-40': '-10rem',
        '-48': '-12rem',
        '-52': '-13rem',
        '-64': '-16rem',
      },
    },
  },
  plugins: [],
};

export default config;