/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'w95-cyan': '#008080',
        'w95-blue': '#000080',
        'w95-grey': '#C6C6C6',
        'w95-dark-grey': '#808080',
        'my-beige': '#FFFDE4',
        'my-red': '#8E2C3B',
        'my-gold': '#97845B',
      },
      boxShadow: {
        'w95': '-2px -2px #e0dede, -2px 0 #e0dede, 0 -2px #e0dede, -4px -4px white, -4px 0 white, 0 -4px white, 2px 2px #818181, 0 2px #818181, 2px 0 #818181,  2px -2px #e0dede, -2px 2px #818181, -4px 2px white, -4px 4px black, 4px 4px black, 4px 0 black, 0 4px black, 2px -4px white, 4px -4px black',
        'w95-inverted': '-2px -2px #818181, -2px 0 #818181, 0 -2px #818181, -4px -4px black, -4px 0 black, 0 -4px black, 2px 2px #e0dede, 0 2px #e0dede, 2px 0 #e0dede,  2px -2px #818181, -2px 2px #e0dede, -4px 2px black, -4px 4px white, 4px 4px white, 4px 0 white, 0 4px white, 2px -4px black, 4px -4px white',
        'w95-thin': '-1px -1px #e0dede, -1px 0 #e0dede, 0 -1px #e0dede, -1px -1px white, -1px 0 white, 0 -1px white, 1px 1px #818181, 0 1px #818181, 1px 0 #818181,  1px -1px #e0dede, -1px 1px #818181, -1px 1px white, -1px 1px black, 1px 1px black, 1px 0 black, 0 1px black, 1px -1px white, 1px -1px black',
        'w95-inverted-thin': '-1px -1px #818181, -1px 0 #818181, 0 -1px #818181, -2px -2px black, -2px 0 black, 0 -2px black, 1px 1px #e0dede, 0 1px #e0dede, 1px 0 #e0dede,  1px -1px #818181, -1px 1px #e0dede, -2px 1px black, -2px 2px white, 2px 2px white, 2px 0 white, 0 2px white, 1px -2px black, 2px -2px white'
      },
      fontFamily: {
        'w95': ['w95', 'Arial', 'sans-serif'],
      },
      cursor: {
        'w95-default': 'url(/cursors/default.cur), default',
        'w95-pointer': 'url(/cursors/pointer.cur), pointer',
        'w95-text': 'url(/cursors/default.cur), default',
        'w95-move': 'url(/cursors/move.cur), move',
        'w95-ew-resize': 'url(/cursors/resize-ew.cur), ew-resize',
        'w95-ns-resize': 'url(/cursors/resize-ns.cur), ns-resize',
        'w95-nwse-resize': 'url(/cursors/resize-nwse.cur), nwse-resize',
        'w95-nesw-resize': 'url(/cursors/resize-nesw.cur), nesw-resize',
      }
    }
  },
  plugins: []
};