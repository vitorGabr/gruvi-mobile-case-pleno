/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: "rgb(var(--color-background-default)/<alpha-value>)",
				},
				accent: {
					DEFAULT: "rgb(var(--color-accent-default)/<alpha-value>)",
				},
				foreground: {
					DEFAULT: "rgb(var(--color-foreground-default)/<alpha-value>)",
				},
				border: {
					DEFAULT: "rgb(var(--color-border-default)/<alpha-value>)",
				},
				typography: {
					DEFAULT: "rgb(var(--color-typography-default)/<alpha-value>)",
				},
			},
			borderRadius: {
				l3: "var(--radius)",
				l2: "calc(var(--radius) - 2px)",
				l1: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [],
};
