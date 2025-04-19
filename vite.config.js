// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CehSim/', // <<< 👈 this must match your GitHub repo name exactly
  build: {
    outDir: 'docs' // <<< GitHub Pages only lets you choose /docs or /(root)
  },
  plugins: [react()]
})
