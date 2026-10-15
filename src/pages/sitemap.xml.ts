import type { APIRoute } from 'astro';
import { navigation } from '../data/site';
import { withBase } from '../lib/urls';

export const GET: APIRoute = ({ site }) => new Response(
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${navigation.map(page => `<url><loc>${new URL(withBase(page.href), site).href}</loc></url>`).join('')}</urlset>`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
