import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:3000', // URL de votre serveur backend
        changeOrigin: true, // Nécessaire pour les hôtes virtuels
        secure: false, // Si votre backend est en HTTPS, mettez ceci à true
      },
    }
  }
})
