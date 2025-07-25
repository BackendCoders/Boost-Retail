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
				'page-heading': '24px', // 24pt
				'data-header': '18.6px', // 14pt
				'data-body': '18.6px', // 14pt
				'form-field': '18.6px', // 14pt
				'checkbox-label': '20px', // 15pt
				'small-button': '16px', // 12pt
				'breadcrumb': '17.3px', //13pt
				'small-detail': '17.3px', // 13pt
			},
			colors: {
				primary: {
					base: '#0080ff',
					select: '#0070cc',
				},
			},
		},
	},
	plugins: [],
};
