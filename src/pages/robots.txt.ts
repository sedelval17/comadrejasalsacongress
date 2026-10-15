import type { APIRoute } from 'astro';
import { withBase } from '../lib/urls';

export const GET: APIRoute = ({ site }) => new Response(
  __COMADREJA_PREVIEW__
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('/sitemap.xml'), site).href}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
