// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import react from '@astrojs/react';
import path from "path";

dotenv.config();
const defineVars = {};
if (process.env.VITE_SERVER) {
  defineVars['import.meta.env.VITE_SERVER'] = JSON.stringify(process.env.VITE_SERVER);
}
// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT || 5172)
  },
  vite: {
    define: defineVars,
    resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@fonts': path.resolve('./public/fonts'),
        '@svg': path.resolve('./src/assets/svg'),
      },
    },
  },
  outDir: "./build"
});