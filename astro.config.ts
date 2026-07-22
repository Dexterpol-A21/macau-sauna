import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

const PAGE_PRIORITY: Record<string, { priority: number; changefreq: string }> = {
  '/':                           { priority: 1.0,  changefreq: 'weekly'  },
  '/venues/':                    { priority: 0.9,  changefreq: 'weekly'  },
  '/ranking/':                   { priority: 0.9,  changefreq: 'weekly'  },
  '/contact/':                   { priority: 0.8,  changefreq: 'monthly' },
  '/how-it-works/':              { priority: 0.7,  changefreq: 'monthly' },
  '/faq/':                       { priority: 0.7,  changefreq: 'monthly' },
  '/about/':                     { priority: 0.6,  changefreq: 'monthly' },
  '/privacy/':                   { priority: 0.1,  changefreq: 'yearly'  },
  '/terms/':                     { priority: 0.1,  changefreq: 'yearly'  },
  '/404/':                       { priority: 0.0,  changefreq: 'never'   },
};

export default defineConfig({
  site: 'https://macausauna.com',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;

        // Exclude utility pages from sitemap
        const EXCLUDE: string[] = [];
        if (EXCLUDE.some(p => pathname.startsWith(p))) return undefined;

        // Venue detail: /venues/some-slug/
        if (pathname.startsWith('/venues/') && pathname !== '/venues/') {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }

        // Exact route match
        const cfg = PAGE_PRIORITY[pathname];
        if (cfg) return { ...item, ...cfg };

        // Fallback
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  devToolbar: { enabled: false },
});
