import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Dynamic dev mode verification helper option
      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        name: 'Ibirwa Kivu Bike Tours',
        short_name: 'Ibirwa Bike',
        description: 'Adventure Cycling & Tours in Rwanda',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/bt-logo-52.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/bt-logo-52.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
        ]
      }
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  build: {
    target: 'esnext',
    // SPEED OPTIMIZATION: Implements automated chunk splitting for vendor modules
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Isolates heavy dependency libraries out of your main client logic script chunk
            return 'vendor';
          }
        }
      }
    }
  }
});
