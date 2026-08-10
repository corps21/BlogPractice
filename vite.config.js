import path from "node:path";
import process from "node:process";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const apiEndpoint = env.VITE_API_ENDPOINT;
	if (!apiEndpoint) {
		throw new Error(
			`VITE_API_ENDPOINT is not defined for mode "${mode}". Create a .env${mode ? `.${mode}` : ""} file with VITE_API_ENDPOINT=...`,
		);
	}

	return {
		server: {
			host: "localhost",
			proxy: {
				"/api": {
					target: apiEndpoint,
					changeOrigin: true,
					secure: false,
					rewrite: (p) => p.replace(/^\/api/, "/api/v1"),
				},
			},
		},
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(process.cwd(), "./src"),
			},
		},
	};
});
