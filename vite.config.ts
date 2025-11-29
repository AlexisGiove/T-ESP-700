import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Si le repo GitHub s'appelle "argos-landing", décommenter la ligne suivante :
  // base: '/argos-landing/',
  // Sinon, laisser vide pour un déploiement à la racine
})



