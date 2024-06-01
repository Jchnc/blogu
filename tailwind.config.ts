import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				"bg-primary": "#0d1117",
				"bg-secondary": "#1e252f",
				"bg-tertiary": "#121826",
				"bg-borders": "#2d343e",
				"txt-primary": "#f0f6fc",
				"txt-secondary": "#737b84"
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			},
			gridTemplateColumns: {
				"auto-fit": "repeat(auto-fit, minmax(300px, 1fr))"
			},
			container: {
				screens: {
					xs: "100%",
					sm: "640px",
					md: "768px",
					lg: "1024px"
				},
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					"2xl": "6rem"
				}
			}
		}
	},
	plugins: []
};
export default config;
