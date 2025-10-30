import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    transformer: 'postcss', // ✅ Disable LightningCSS (fix for Vercel)
  },
  build: {
    outDir: 'dist', // ✅ make sure build output is clear
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // your Express backend
        changeOrigin: true,
      },
    },
  },
})
