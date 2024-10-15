/** @type {import('tailwindcss').Config} */
const config = {
	// darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],

	important: true,

	darkMode: 'false',

	theme: {
		extend: {
			fontFamily: {
				sans: ['universaltstd', 'sans-serif']
			},

			colors: {
				'bg-primary': '#e5e5e5'
			},

			spacing: {
				xxxs: '.1rem',
				xxs: '.25rem',
				xs: '.5rem',
				sm: '1rem',
				md: '1.5rem',
				lg: '2rem',
				xl: '3rem',
				'1.5xl': '4.5rem',
				'2xl': '6rem',
				'2.5xl': '7.5rem',
				'3xl': '9rem'
			},

			screens: {
				xxs: '360px',
				xs: '410px',
				'xs/sm': '525px',
				sm: '640px',
				'sm/md': '704px',
				md: '768px',
				'md/lg': '896px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1800px'
			},

			lineHeight: {
				'my-relaxed': '1.7',
				'my-semi-relaxed': '1.5'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('tailwind-scrollbar', 'tailwind-scrollbar-hide')]
};

export default config;
