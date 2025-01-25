import { vars } from "nativewind";

export const themes = {
	light: vars({
		"--color-accent-default": "58, 94, 150",
		"--color-background-default": "255, 255, 255",
		"--color-foreground-default": "229, 231, 235",
		"--color-typography-default": "0, 0, 0",
		"--color-border-default": "227, 225, 225",
	}),
	dark: vars({
		"--color-accent-default": "58, 94, 150",
		"--color-background-default": "0, 0, 0",
		"--color-foreground-default": "30, 41, 57",
		"--color-typography-default": "255, 255, 255",
		"--color-border-default": "46, 46, 46",
	}),
} as const;
