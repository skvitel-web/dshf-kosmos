import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src' // Vite использует относительный путь от корня проекта (frontend/)
    }
  }
})
