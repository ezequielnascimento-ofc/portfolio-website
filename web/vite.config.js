import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Uma página HTML por estudo de caso, para cada uma ter o próprio título e preview (Open Graph).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        plataformaMcp: resolve(import.meta.dirname, 'casos/plataforma-mcp/index.html'),
      },
    },
  },
})
