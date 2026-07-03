/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0F1113',
          800: '#171717'
        },
        offwhite: '#EFE7DD',
        cossackred: '#8E0F18'
      },
      backgroundImage: {
        'paper-texture': "url('../assets/textures/paper-texture.png')",
        'grain': "url('../assets/textures/grain.png')"
      }
    }
  },
  plugins: []
}

