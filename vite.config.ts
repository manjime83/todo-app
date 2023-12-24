import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "pocketbase/pb_public" },
  server: { proxy: { "/api": "http://127.0.0.1:8090", "/_": "http://127.0.0.1:8090" } },
});
