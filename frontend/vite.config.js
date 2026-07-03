import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set `base` so built assets load correctly on GitHub Pages under the repo name
// Update this when you rename the repository so asset paths match the Pages URL.
export default defineConfig({
  // For a user/org Pages site (username.github.io) built files should be served at '/'
  // For this repository (project site) the base must match the repo path so
  // assets are requested under: https://<user>.github.io/<repo>/
  base: '/cossackauto.github.io/',
  plugins: [react()],
})
