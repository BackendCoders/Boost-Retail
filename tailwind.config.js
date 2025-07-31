/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			fontSize: {
				'page-title': '32px', //24pt
				'section-heading': '25px', // 19pt
				'page-heading': '24px', // 18pt
				'data-header': '18.6px', // 14pt
				'data-body': '18.6px', // 14pt
				'standard-button': '18.6px', // 14pt
				'form-field': '18.6px', // 14pt
				'checkbox-label': '20px', // 15pt
				'small-button': '16px', // 12pt
				'breadcrumb': '17.3px', //13pt
				'small-detail': '17.3px', // 13pt
			},
			colors: {
				offWhite: '#f5f5f5',
				primary: {
					base: '#0080ff', // Accent Color / key buttons
					select: '#0070cc', // hover / selected state for left nav (only)
				},
				text: {
					title: '#000000', // Page / Section Titles
					body: '#555555', // Input text / dropdown / body text / input box border
					suggested: '#bababa', // Input box suggested text
				},
				border: {
					input: '#555555', // Input box border
					grid: '#dbdbdb', // Data grid lines
				},
				background: {
					light: '#f5f5f5', // Light backgrounds
				},
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
