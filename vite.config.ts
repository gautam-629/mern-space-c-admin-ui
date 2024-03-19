// /// <reference types="vitest" />

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: 'jsdom',
//     setupFiles: './setupTest.ts',
//     globals: true
//   },
// })

/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTest.ts'], // Corrected to an array
    globals: true
  }
});
