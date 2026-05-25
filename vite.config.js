import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import nodeCrypto from 'crypto';

if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.getRandomValues) {
  globalThis.crypto = {
    // Satisfies serialize-javascript internal asset tracking UID engines
    randomUUID: () => nodeCrypto.randomUUID(),
    // Maps standard random integer buffer array generations cleanly
    getRandomValues: (buffer) => nodeCrypto.webcrypto.getRandomValues(buffer),
    subtle: nodeCrypto.webcrypto?.subtle
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW', 
      
      devOptions: {
        enabled: true,
        type: 'module'
      },
      
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'], 
        navigateFallback: '/index.html', 
      },
      
      manifest: {
        name: 'Ibirwa Kivu Bike Tours',
        short_name: 'Ibirwa Bike',
        description: 'Adventure Cycling & Tours in Rwanda',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', 
        orientation: 'portrait',
        start_url: '/', 
        scope: '/',
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
    exclude: ['**/tests/**', '**/node_modules/**', '**/dist/**'],
  },
  
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
