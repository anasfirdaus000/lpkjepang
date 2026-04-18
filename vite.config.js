import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        program: resolve(__dirname, 'program.html'),
        kegiatan: resolve(__dirname, 'kegiatan.html'),
        programDetail: resolve(__dirname, 'program-detail.html'),
        kegiatanDetail: resolve(__dirname, 'kegiatan-detail.html'),
        about: resolve(__dirname, 'about.html'),
        admin: resolve(__dirname, 'admin.html'),
        adminDashboard: resolve(__dirname, 'admin-dashboard.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
