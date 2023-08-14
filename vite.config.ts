import react from '@vitejs/plugin-react';
import {defineConfig, splitVendorChunkPlugin} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import {externalizeDeps} from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    externalizeDeps({
      deps: false,
      devDeps: true,
      except: [],
      nodeBuiltins: true,
      optionalDeps: true,
      peerDeps: true,
    }),
    cssInjectedByJsPlugin({relativeCSSInjection: true}),
    splitVendorChunkPlugin(),
    react(),
  ],
  build: {
    cssCodeSplit: true,
    outDir: './lib',
    lib: {
      entry: {
        index: 'src/index',
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        interop: 'auto',
        globals: {
          react: 'React',
        },
        dir: 'lib',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    target: ['esnext'],
  },
});
