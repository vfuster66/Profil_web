import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Site utilisateur GitHub Pages (vfuster66.github.io) : servi à la racine.
export default defineConfig({
  plugins: [vue()],
  base: '/',
})
