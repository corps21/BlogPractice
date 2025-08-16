import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		proxy: {
			"/user": {
				target: "http://localhost:3000",
				rewrite: (path) => path.replace(/^\/user/, "/api/v1/user"),
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
