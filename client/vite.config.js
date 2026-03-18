import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Important: For GitHub Pages, set base to repository name
  // Example: if repo is "my-portfolio", change to: base: '/my-portfolio/'
  // For local dev or custom domain, use: base: '/'
  base: process.env.VITE_BASE_URL || '/',
  
  plugins: [react()],
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for security
    minify: 'terser',
    rollupOptions: {
      output: {
        // Obfuscate output for added security
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons'],
        }
      }
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-icons']
  }
})

