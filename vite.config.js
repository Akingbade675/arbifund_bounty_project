import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    target: 'esnext',
  },
})
