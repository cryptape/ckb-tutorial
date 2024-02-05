import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import mdx from '@mdx-js/rollup';

var vite_config = defineConfig({
  plugins: [react(), mdx(
      {
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [],
        rehypePlugins: [],
      }
  )],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});

export default vite_config;
