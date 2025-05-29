import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  
  plugins: [
    react(),
    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './example_app_src'),
      'ai-prompt-panel': path.resolve(__dirname, './src/ai-prompt-panel/AIPromptPanel.tsx')
    }
  },
  
 
  build: {
    outDir: 'dist_example',
    sourcemap: true,
  },
  server: {
    port: 3001,
  }
}) 
