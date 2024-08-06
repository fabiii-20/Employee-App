// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust if deploying to a subdirectory
  build: {
    outDir: 'dist', // Change if needed
    sourcemap: true, // Enable source maps for production
    rollupOptions: {
      // Optional Rollup configuration
    },
  },
});
