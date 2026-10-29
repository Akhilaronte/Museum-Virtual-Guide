import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for asset URLs.
// - Local dev / local preview builds: '/' (default).
// - GitHub Pages project site: set BASE_PATH to "/<repo-name>/" in the deploy workflow.
// This keeps the same source working locally and when hosted under a project URL.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
