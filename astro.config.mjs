import { defineConfig } from 'astro/config';

const preview = process.env.COMADREJA_PREVIEW === '1';

export default defineConfig({
  site: process.env.COMADREJA_SITE_URL || 'https://comadrejaproducciones.com',
  base: process.env.COMADREJA_BASE_PATH || '/',
  vite: { define: { __COMADREJA_PREVIEW__: JSON.stringify(preview) } },
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
