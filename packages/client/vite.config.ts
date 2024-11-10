import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiUrl =
    process.env.NODE_ENV === "production"
        ? "https://pms-api-mzlj.onrender.com/api"
        : "http://localhost:3000/api";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: [
            "i18next",
            "i18next-browser-languagedetector",
            "react-i18next",
            "@tabler/icons-react",
        ],
    },
    server: {
        hmr: true,
        proxy: {
            "/api": {
                target: apiUrl,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
