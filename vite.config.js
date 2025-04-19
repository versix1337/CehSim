import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CehSim/',
  build: {
    outDir: 'docs', // 👈 put build files into /docs instead of /dist
  },
  plugins: [react()],
})
