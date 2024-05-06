import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteAliases({
      prefix: '$',
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use 'sass:color';
        @use "sass:math";
        @import "$assets/sass/base.scss";
        `
      }
    }
  },
})
