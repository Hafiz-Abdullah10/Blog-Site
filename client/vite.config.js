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
    outDir: 'dist', // ✅ ensure build folder is clear and consistent
    emptyOutDir: true, // ✅ clean dist folder before each build
  },
  server: {
    proxy: process.env.VERCEL ? {} : { // ✅ disable proxy on Vercel
      '/api': {
        target: 'http://localhost:3000', // your Express backend (local)
        changeOrigin: true,
      },
    },
  },
})
