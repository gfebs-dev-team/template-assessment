import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    ViteAliases({
      prefix: "#",
    }),
    tailwindcss(),
  ],
});
