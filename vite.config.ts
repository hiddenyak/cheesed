// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
	base: "/",
	plugins: [vue()],
	build: {
		outDir: ".", // Output directly to root
		emptyOutDir: false, // Don't delete everything in root when building
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
		},
	},
});
