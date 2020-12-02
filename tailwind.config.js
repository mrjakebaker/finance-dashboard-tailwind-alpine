const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	theme: {
		extend: {
			colors: {
				'light-blue': colors.lightBlue,
				cyan: colors.cyan,
				gray: colors.blueGray,
			},
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {},
	plugins: [],
};
