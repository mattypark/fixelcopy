import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5180,
    open: false,
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    assetsInlineLimit: 0,
  },
});
