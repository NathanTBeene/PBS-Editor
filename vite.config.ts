import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/PBS-Editor",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@/components": "/src/components",
      "@/lib": "/src/lib",
      "@/assets": "/src/assets",
      "@/routes": "/src/routes",
      "@/hooks": "/src/lib/hooks",
      "@/models": "/src/lib/models",
      "@/providers": "/src/lib/providers",
      "@/services": "/src/lib/services",
      "@/theme": "/src/lib/theme",
    },
  },
});
