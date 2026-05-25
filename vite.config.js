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
      strategies: 'generateSW', // Compiles the service worker fully for production deployment
      
      // Dynamic dev mode verification helper option
      devOptions: {
        enabled: true,
        type: 'module'
      },
      
      // PRODUCTION PWA OPTIMIZATION: Manages absolute asset caching definitions
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'], // Caches foundational app shell files
        navigateFallback: '/index.html', // Redirects broken sub-navigation routes to your SPA handler
      },
      
      manifest: {
        name: 'Ibirwa Kivu Bike Tours',
        short_name: 'Ibirwa Bike',
        description: 'Adventure Cycling & Tours in Rwanda',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Hides browser URL controls to behave like a native mobile app
        orientation: 'portrait',
        start_url: '/', // Explicitly maps your application baseline entry point
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
            purpose: 'any maskable' // Necessary for Android device icon clipping compliance
          },
        ]
      }
    }),
  ],
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    // INTEGRATION FIX: Excludes your Playwright E2E test folder so "npm run test:unit" does not crash
    exclude: ['**/tests/**', '**/node_modules/**', '**/dist/**'],
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
