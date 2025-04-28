/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ['zentry', 'sans-serif'],
        general: ['general', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif'],
      },

      colors:{
        blue: {
          50: '#DFDFF0', // soft lavender blue (very light)
          75: '#DFDFF2', // almost identical soft lavender blue
          100: '#F0F2FA', // very light grayish blue
          200: '#101010', // black (used as black)
          300: '#4FB7DD', // primary bright sky blue
          400: '#0A2342', // dark cool refreshing blue (new)
        },
        violet: {
          300: '#5724FF', // strong vibrant violet (electric style)
          400: '#6A0DAD', // cool electrifying violet (new)
        },
        yellow: {
          100: '#8E983F', // muted olive greenish yellow
          300: '#EDFF66', // bright neon yellow
          400: '#FFC300', // bright thunder orange-yellow (new)
        },
        green: {
          300: '#A8E639', // bright good avocado green (new)
        },
        black: {
          100: '#0B0B0C', // frozen black (new, deeper than normal black)
        }

      }
    },
  },
  plugins: [],
}