import adapter from '@sveltejs/adapter-vercel';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ preserve: ['ld+json'] }),

	kit: {
		adapter: adapter(),

		alias: {
			'^actions': 'src/lib/actions',

			'^assets': 'src/lib/assets',

			'^components': 'src/lib/components',

			'^config': 'src/lib/config',

			'^constants': 'src/lib/constants',

			'^content': 'src/lib/content',

			'^data': 'src/lib/data',

			'^helpers': 'src/lib/helpers',

			'^pages/*': 'src/lib/components/^pages/*',

			'^pages': 'src/lib/components/^pages',

			'^sections': 'src/lib/sections',

			'^stores': 'src/lib/stores',

			'^structured-data-parts': 'src/lib/structured-data-parts',

			'^types': 'src/lib/types',

			'^utils': 'src/lib/utils'
		}
	}
};

export default config;
