// @ts-ignore - Types resolved internally by Vite
import tailwindcss from '@tailwindcss/vite';
// @ts-ignore - Types resolved internally by Vite
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: true,
    },
  };
});
