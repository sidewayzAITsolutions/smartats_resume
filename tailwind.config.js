module.exports = {
  
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'professional': ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
        'modern': ['Inter', 'system-ui', 'sans-serif'],
        'classic': ['Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 30px -5px rgba(59, 130, 246, 0.4)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
      },
       colors: {
        teal: {
          DEFAULT: '#1A504B',
          50: '#E6F9F7',
          100: '#CEF2EF',
          200: '#A1E5DF',
          300: '#74D6CE',
          400: '#5BC7BE',
          500: '#42B8AD',
          600: '#389E95',
          700: '#2E847C',
          800: '#246A63',
          900: '#1A504B',
        },
        gold: {
          DEFAULT: '#D4A136',
          50: '#FDFBF2',
          100: '#FCF6E3',
          200: '#F8ECC6',
          300: '#F3DEA7',
          400: '#EED08A',
          500: '#E8C270',
          600: '#E0B456',
          700: '#D4A136',
          800: '#B38534',
          900: '#96712C',
        },
        cream: {
          DEFAULT: '#F5E7CB',
          light: '#F9F2E0',
        },
        gray: {
          bg: '#F0F0F0',
          // Standard gray shades...
        }
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#1A504B',
        'secondary': '#D4A136',
        'background': '#F0F0F0',
      }),
      textColor: theme => ({
        ...theme('colors'),
        'primary': '#1A504B',
        'secondary': '#D4A136',
        'light': '#F5E7CB',
      }),
      borderColor: theme => ({
        ...theme('colors'),
        'primary': '#1A504B',
        'secondary': '#D4A136',
        'accent': 'rgba(212, 161, 54, 0.3)',
      }),
      gradientColorStops: theme => ({
        ...theme('colors'),
        'primary-start': '#1A504B',
        'primary-end': '#246A63',
        'secondary-start': '#D4A136',
        'secondary-end': '#E0B456',
      }),
    }
  }
}