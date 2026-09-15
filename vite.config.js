import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'animations'
            }
            if (id.includes('lucide')) {
              return 'icons'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})

