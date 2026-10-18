import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
    sourcemap: false,
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion']
        }
      }
    }
  }
}));
