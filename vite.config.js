import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function githubPagesCacheBustPlugin() {
  return {
    name: 'github-pages-cache-bust',
    closeBundle() {
      const version = Date.now();
      for (const file of ['index.html', '404.html']) {
        const filePath = path.resolve(process.cwd(), file);
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf8');
          content = content
            .replace(/dist\/assets\/app\.css(\?v=\d+)?/g, `dist/assets/app.css?v=${version}`)
            .replace(/dist\/assets\/app\.js(\?v=\d+)?/g, `dist/assets/app.js?v=${version}`);
          fs.writeFileSync(filePath, content, 'utf8');
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), githubPagesCacheBustPlugin()],
  base: './',
  cacheDir: '.vite_cache',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/app.[ext]'
      }
    }
  }
});
