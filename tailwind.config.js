/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'argos-dark': '#02060B',
        'argos-dark-secondary': '#050B10',
        'argos-neon': '#60F5C2',
        'argos-turquoise': '#5FF7E6',
        'argos-border': '#1a2332',
      },
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'typewriter': 'typewriter 0.1s steps(1)',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}



