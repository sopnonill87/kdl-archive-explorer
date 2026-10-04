import { defineConfig } from 'vitest/config' // <-- CHANGED FROM 'vite' TO 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})