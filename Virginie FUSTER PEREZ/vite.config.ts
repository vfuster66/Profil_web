import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Sur GitHub Actions, adapte automatiquement le chemin du site :
// - dépôt « vfuster66.github.io » : site servi à la racine (/)
// - tout autre dépôt (ex. « Profil_web ») : site servi sous /Profil_web/
const depot = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const base = depot && !depot.endsWith('.github.io') ? `/${depot}/` : '/'

export default defineConfig({
  plugins: [vue()],
  base,
})
