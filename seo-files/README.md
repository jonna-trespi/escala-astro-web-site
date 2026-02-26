# Archivos SEO (sitemap y robots)

Estos archivos se generan al ejecutar `npm run build` y luego `npm run seo:download` (o directamente `npm run build:seo`).

- **sitemap-index.xml** – Índice del sitemap (para Google Search Console).
- **sitemap-0.xml** – Sitemap con las URLs (referenciado por el índice).
- **robots.txt** – Instrucciones para rastreadores.

Puedes descargarlos desde esta carpeta o abrir **dist/descargar-sitemap-robots.html** en el navegador y usar los botones de descarga.

Para Search Console: si el dominio no sirve los XML, puedes alojar el sitemap en otra URL (por ejemplo un bucket o CDN) y enviar esa URL como sitemap.
