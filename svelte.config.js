import adapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: path.resolve('./src/components'),
      $lib: path.resolve('./src/lib'),
      $icons: path.resolve('./src/icons'),
      $img: path.resolve('./src/img'),
      $programs: path.resolve('./src/components/programs'),
    }
  },
  preprocess: sveltePreprocess()
};
export default config;
