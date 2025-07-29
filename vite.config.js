/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

console.log('Vite configuration loaded');

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			exportAsDefault: false, // this is default, but being explicit
		}),
	],
});
