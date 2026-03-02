/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fff0f0',
          100: '#ffe0e0',
          500: '#800000',
          600: '#6b0000',
          700: '#560000',
          800: '#400000',
          900: '#2b0000',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          300: '#f4d760',
          400: '#D4AF37',
          500: '#c9a227',
          600: '#a88219',
        },
        turmeric: '#F4C430',
        sandalwood: '#EFE6D2',
        peacock: {
          50: '#e8f4f2',
          500: '#0A5B4F',
          600: '#084d43',
          700: '#063e36',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        noto: ['Noto Serif', 'serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4C430 50%, #D4AF37 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #800000 0%, #6b0000 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
