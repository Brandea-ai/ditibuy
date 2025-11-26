import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: '#0066CC',
          50: '#E6F0FA',
          100: '#CCE0F5',
          200: '#99C2EB',
          300: '#66A3E0',
          400: '#3385D6',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        secondary: {
          DEFAULT: '#00A3E0',
          50: '#E6F7FC',
          100: '#CCEFF9',
          200: '#99DFF3',
          300: '#66CFED',
          400: '#33BFE7',
          500: '#00A3E0',
          600: '#0082B3',
          700: '#006286',
          800: '#00415A',
          900: '#00212D',
        },
        accent: {
          DEFAULT: '#FFB800',
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE499',
          300: '#FFD666',
          400: '#FFC933',
          500: '#FFB800',
          600: '#CC9300',
          700: '#996E00',
          800: '#664A00',
          900: '#332500',
        },
        // Bayern Branding
        bavaria: {
          blue: '#0066B3',
          white: '#FFFFFF',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#00C853',
          light: '#E8F5E9',
        },
        error: {
          DEFAULT: '#FF3D00',
          light: '#FFEBEE',
        },
        warning: {
          DEFAULT: '#FF9800',
          light: '#FFF3E0',
        },
        // Neutrals
        surface: '#FFFFFF',
        background: '#FAFAFA',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '1400px',
        'wide': '1920px',
        'section-left': '1200px',
        'section-center': '1400px',
        'section-right': '1200px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
        '4k': '2560px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
