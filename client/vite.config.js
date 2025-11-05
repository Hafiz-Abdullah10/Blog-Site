import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Disable lightningcss explicitly by forcing PostCSS transformer
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'postcss'
  },
  build: {
    outDir: 'dist',
    cssMinify: false // ✅ prevent lightningcss from auto-loading
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
