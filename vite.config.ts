import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set BASE_PATH (for example "/sorokit-docs/") when hosting under a sub-path,
// such as a GitHub Pages project site.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
});
