/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'windows-cyan': '#008080',
        'windows-blue': '#000080',
        'windows-grey': '#C6C6C6',
        'windows-dark-grey': '#808080',
      },
      boxShadow: {
        'windows': '-2px -2px #e0dede, -2px 0 #e0dede, 0 -2px #e0dede, -4px -4px white, -4px 0 white, 0 -4px white, 2px 2px #818181, 0 2px #818181, 2px 0 #818181,  2px -2px #e0dede, -2px 2px #818181, -4px 2px white, -4px 4px black, 4px 4px black, 4px 0 black, 0 4px black, 2px -4px white, 4px -4px black',
        'windows-inverted': '-2px -2px #818181, -2px 0 #818181, 0 -2px #818181, -4px -4px black, -4px 0 black, 0 -4px black, 2px 2px #e0dede, 0 2px #e0dede, 2px 0 #e0dede,  2px -2px #818181, -2px 2px #e0dede, -4px 2px black, -4px 4px white, 4px 4px white, 4px 0 white, 0 4px white, 2px -4px black, 4px -4px white',
        'windows-thin': '-1px -1px #e0dede, -1px 0 #e0dede, 0 -1px #e0dede, -1px -1px white, -1px 0 white, 0 -1px white, 1px 1px #818181, 0 1px #818181, 1px 0 #818181,  1px -1px #e0dede, -1px 1px #818181, -1px 1px white, -1px 1px black, 1px 1px black, 1px 0 black, 0 1px black, 1px -1px white, 1px -1px black',
        'windows-inverted-thin': '-1px -1px #818181, -1px 0 #818181, 0 -1px #818181, -2px -2px black, -2px 0 black, 0 -2px black, 1px 1px #e0dede, 0 1px #e0dede, 1px 0 #e0dede,  1px -1px #818181, -1px 1px #e0dede, -2px 1px black, -2px 2px white, 2px 2px white, 2px 0 white, 0 2px white, 1px -2px black, 2px -2px white'
      }
    }
  },
  plugins: []
};