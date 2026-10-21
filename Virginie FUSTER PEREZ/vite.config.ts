import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Site de projet : https://vfuster66.github.io/Profil_web/
export default defineConfig({
  plugins: [vue()],
  base: '/Profil_web/',
})
