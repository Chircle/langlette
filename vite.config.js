import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // repo name is injected by the deploy workflow via VITE_BASE_PATH
  base: process.env.VITE_BASE_PATH ?? '/',
})
