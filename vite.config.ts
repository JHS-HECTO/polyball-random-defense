import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  server: { port: 5173 },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'src/config'),
      scenes: path.resolve(__dirname, 'src/scenes'),
      ui: path.resolve(__dirname, 'src/ui'),
      systems: path.resolve(__dirname, 'src/systems'),
      entities: path.resolve(__dirname, 'src/entities'),
      lib: path.resolve(__dirname, 'src/lib'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
