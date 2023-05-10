import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import markdown from 'vite-plugin-solid-markdown';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  plugins: [
    markdown({
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'github-light',
          },
        ],
      ],
    }),
    solid({ extensions: ['.mdx', '.md'], ssr: false }),
    {
      name: 'add-cors',
      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
          next();
        });
      },
    },
  ],
});
