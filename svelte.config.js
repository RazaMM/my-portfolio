import adapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: staticAdapter()
  },
  preprocess: sveltePreprocess()
};
export default config;