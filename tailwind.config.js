/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const gmpColors = {
	gmpDarkBlue: '#051B34',
	gmpLightBlue: '#bdd6e6',
	gmpBlackCoral: '#475e6c',
	gmpNeonBlue: '#3957ff',
	gmpRedPurple: '#E21575'
}

module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		fontFamily: {
			sans: ['"Inter var"', ...defaultTheme.fontFamily.sans], // overwrite default font
			lato: ['Lato'],
			poppins: ['Poppins'],
			kalam: ['Kalam'],
			MrDafoe: ['"Mr Dafoe"']
		},
		extend: {
			colors: {
				primary: colors.indigo,
				secondary: colors.white,
				warning: colors.yellow,
				danger: colors.red,
				success: colors.green,
				gmpDarkBlue: gmpColors.gmpDarkBlue,
				gmpLightBlue: gmpColors.gmpLightBlue,
				gmpBlackCoral: gmpColors.gmpBlackCoral,
				gmpNeonBlue: gmpColors.gmpNeonBlue,
				gmpRedPurple: gmpColors.gmpRedPurple
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
