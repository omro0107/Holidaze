import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
  base: '/',
  envPrefix: ['VITE_', 'NOROFF_']
});
