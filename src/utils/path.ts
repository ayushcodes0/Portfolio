// With `build.format: 'file'`, Astro.url.pathname is e.g. "/index.html" or "/work.html" at build time.
// Normalize to the clean public URL ("/", "/work") that Vercel's cleanUrls serves.
export function cleanPath(pathname: string): string {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  return p === '' ? '/' : p;
}
