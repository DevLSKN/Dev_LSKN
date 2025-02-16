/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        'primary-foreground': '#ffffff',
        input: '#e2e8f0',
        ring: '#3490dc',
        accent: '#f3f4f6',
        'accent-foreground': '#1a202c',
      },
      backgroundColor: {
        background: '#ffffff',
      },
      fontSize: {
        'xs-mobile': ['0.75rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['1rem', { lineHeight: '1.5rem' }],
        'lg-mobile': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl-mobile': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl-mobile': ['1.5rem', { lineHeight: '2rem' }],
      },
      spacing: {
        'mobile-card': '1rem',
        'mobile-section': '2rem',
        'mobile-container': '1.5rem',
      },
      padding: {
        'mobile-inner': '0.75rem',
        'mobile-outer': '1rem',
      },
      margin: {
        'mobile-stack': '1rem',
      },
      height: {
        'mobile-card': '250px',
        'mobile-hero': '400px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out'
      }
    },
  },
  plugins: [],
}