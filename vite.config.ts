import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
  },
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL de votre serveur backend
        changeOrigin: true, // Nécessaire pour les hôtes virtuels
        secure: false, // Si votre backend est en HTTPS, mettez ceci à true
      },
    }
  }
})
