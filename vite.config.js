import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  loader: { ".js": "jsx" },
});

// vite.config.js
export default {
  build: {
    target: 'esnext', // ensure the target is esnext or a compatible ES module version
    // other options as needed
  }
};
