import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import mdx from '@mdx-js/rollup';

var vite_config = defineConfig({
  plugins: [reactRefresh(), mdx()],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});

export default vite_config;
