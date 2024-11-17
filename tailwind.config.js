/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'auth-illu': 'url(\'/background-auth\')',
        'auth-intro': 'url(\'/intro-01.jpg\')',
        'auth-intro-2': 'url(\'/intro-01-dark.jpg\')',

      },
      colors: {
        app: {
          active: 'hsl(var(--active))',
          inactive: 'hsl(var(--inactive))',
          success: 'hsl(var(--success))',
          pending: 'hsl(var(--pending))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        default: {
          blue: 'hsl(var(--def-1))',
          red: 'hsl(var(--def-2))',
          white: 'hsl(var(--def-3))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          alpha20: '#43f5ed33',
        },
        neutral: {
          100: '#ffffff',
          200: '#ececec',
          300: '#dadada',
          400: '#c7c7c7',
          500: '#a7a7a7',
          600: '#909090',
          700: '#7e7e7e',
          800: '#6d6d6d',
          900: '#525252',
          1000: '#383838',
          1100: '#272727',
          1200: '#181818',
          alpha10: '#ffffff19',
          alpha15: '#ffffff26',
          alpha20: '#ffffff33',
          alpha25: '#ffffff3f',
          alpha30: '#ffffff4c',
          alpha35: '#ffffff59',
          alpha40: '#ffffff66',
          alpha45: '#ffffff72',
          alpha50: '#ffffff7f',
          alpha75: '#ffffffbf',
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'image-glow': {
          '0%': {
            'opacity': '0',
            'animation-timing-function': 'cubic-bezier(0.74, 0.25, 0.76, 1)',
          },
          '10%': {
            'opacity': '0.7',
            'animation-timing-function': 'cubic-bezier(0.12, 0.01, 0.08, 0.99)',
          },
          '100%': {
            opacity: '0.4',
          },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'shimmer': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shimmer-width)) 0',
          },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
        'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
        'fade-up': 'fade-up 1000ms var(--animation-delay, 0ms) ease forwards',
        'shimmer': 'shimmer 8s infinite',
        'marquee': 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animate')],
};
