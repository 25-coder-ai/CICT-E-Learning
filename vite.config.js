import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward exercise-storage API calls to the FastAPI backend.
      "/api": "http://localhost:8000",
    },
  },
});
