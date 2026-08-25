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
        target: 'http://116.118.6.22:58888',
        changeOrigin: true,
        headers: {
          Origin: 'http://116.118.6.22:58888'
        }
      },
    },
  },
})
