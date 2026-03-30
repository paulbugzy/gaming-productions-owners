/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		fontFamily: {
			sans: ['"Inter var"', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				primary: colors.indigo,
				secondary: colors.white,
				warning: colors.yellow,
				danger: colors.red,
				success: colors.green
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
