import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deserto — Vite + React. Assets live under public/assets and are referenced
// with absolute paths (/assets/...) so the DS token CSS and React kits can
// share them across the marketing site, order page, and mobile app demo.
export default defineConfig({
  plugins: [react()],
  server: { open: true },
});
