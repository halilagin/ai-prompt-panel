import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import { visualizer } from 'rollup-plugin-visualizer'; // Optional: for bundle analysis

export default defineConfig({
  plugins: [
    react(),
    // visualizer({ open: true, gzipSize: true, brotliSize: true }), // Optional: npm install -D rollup-plugin-visualizer
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/ai-prompt-panel/index.ts'), // Changed to index.ts
      name: 'AiPromptPanel', // Global variable name for UMD build
      fileName: (format) => `index.${format === 'es' ? 'mjs' : format === 'umd' ? 'umd.js' : 'js'}`,
      formats: ['es', 'umd', 'cjs'], // Output formats
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: [
        'react',
        'react-dom',
        'zustand',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material',
        '@mui/icons-material',
        'lucide-react',
        'highlight.js',
        'lowlight',
        // Add any other libraries that are peer dependencies
        // For example, if @tiptap/* or other UI libraries are expected to be installed by the consumer:
        // '@tiptap/core', '@tiptap/react', '@tiptap/extension-code-block-lowlight', etc.
      ],
      output: {
        globals: { // For UMD build
          'react': 'React',
          'react-dom': 'ReactDOM',
          'zustand': 'Zustand',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled',
          '@mui/material': 'MuiMaterial',
          '@mui/icons-material': 'MuiIconsMaterial',
          'lucide-react': 'LucideReact',
          'highlight.js': 'hljs',
          'lowlight': 'lowlight',
          // Add globals for other externalized libraries if needed for UMD
        },
        // If you have CSS, make sure it's extracted
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css';
          }
          return assetInfo.name || 'assets/[name]-[hash][extname]'; // Ensure a string is returned
        },
      },
    },
    sourcemap: true, // Generate source maps
    // target: 'esnext', // Or your desired target, Vite defaults are usually good
    // emptyOutDir: true, // Set to false if you have other files in dist/ you want to keep
  },
  resolve: {
    alias: {
      // Replicate any aliases from your main tsconfig.json if your library code uses them
      // Example: '@': path.resolve(__dirname, 'src'),
    },
  },
}); 