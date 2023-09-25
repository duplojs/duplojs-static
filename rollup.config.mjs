import {defineConfig} from "rollup";
import esbuild from "rollup-plugin-esbuild";

export default defineConfig([
	{
		input: "scripts/static.ts",
		output: [
			{
				file: "dist/static.mjs",
				format: "esm"
			},
			{
				file: "dist/static.cjs",
				format: "cjs",
			}
		],
		plugins: [
			esbuild({
				include: /\.[jt]sx?$/,
				exclude: /node_modules/,
				tsconfig: "tsconfig.json",
			})
		]
	},
]);
