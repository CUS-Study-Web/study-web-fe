import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      // Local dev: proxy /api/* → http://localhost:8080/*
      // Production: Nginx handles /api/* → backend (no proxy needed)
      '/api': {
        target: 'http://<BE_PROD_URL>',
        changeOrigin: true,
        headers: {
          Origin: 'http://<BE_PROD_URL>'
        }
      },
    },
  },
})
