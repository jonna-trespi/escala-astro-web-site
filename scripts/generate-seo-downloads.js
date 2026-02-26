import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const seoDir = path.join(root, 'seo-files');

const files = [
  { name: 'sitemap-index.xml', mime: 'application/xml' },
  { name: 'sitemap-0.xml', mime: 'application/xml' },
  { name: 'robots.txt', mime: 'text/plain' },
];

const contents = {};
for (const f of files) {
  const p = path.join(dist, f.name);
  if (fs.existsSync(p)) {
    contents[f.name] = fs.readFileSync(p, 'utf8');
  }
}

if (Object.keys(contents).length === 0) {
  console.warn('No se encontraron archivos SEO en dist/. Ejecuta "npm run build" primero.');
  process.exit(0);
}

// Carpeta seo-files para descargar desde el repo o local
fs.mkdirSync(seoDir, { recursive: true });
for (const [name, text] of Object.entries(contents)) {
  fs.writeFileSync(path.join(seoDir, name), text);
}
console.log('Archivos copiados a seo-files/:', Object.keys(contents).join(', '));

// HTML autocontenido con botones de descarga (contenido en script JSON para no limitar tamaño)
let contentsJson = JSON.stringify(contents);
contentsJson = contentsJson.replace(/<\/script/gi, '\\u003c/script');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Descargar Sitemap y Robots - Escala 24x7</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; }
    h1 { font-size: 1.25rem; }
    .buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1.5rem 0; }
    a.btn { display: inline-block; padding: 0.6rem 1rem; background: #0d9488; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500; }
    a.btn:hover { background: #0f766e; }
    p { color: #475569; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Archivos SEO para Escala 24x7</h1>
  <p>Descarga el sitemap y robots.txt para usar en Google Search Console u otro hosting.</p>
  <div class="buttons">
    ${Object.keys(contents).map((name) => `<a class="btn" href="#" data-download="${name}">Descargar ${name}</a>`).join('\n    ')}
  </div>
  <script type="application/json" id="seo-contents">${contentsJson.replace(/<\/script>/g, '<\\/script>')}</script>
  <script>
    var raw = document.getElementById('seo-contents').textContent;
    var contents = JSON.parse(raw);
    document.querySelectorAll('[data-download]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var name = this.getAttribute('data-download');
        var content = contents[name];
        if (!content) return;
        var type = name.endsWith('.xml') ? 'application/xml' : 'text/plain';
        var blob = new Blob([content], { type: type });
        var url = URL.createObjectURL(blob);
        var x = document.createElement('a'); x.href = url; x.download = name; x.click();
        URL.revokeObjectURL(url);
      });
    });
  </script>
</body>
</html>`;

// Escribir HTML en dist para que se pueda desplegar o abrir local
fs.writeFileSync(path.join(dist, 'descargar-sitemap-robots.html'), html);
console.log('Página de descarga generada: dist/descargar-sitemap-robots.html');
console.log('Abre ese archivo en el navegador (o la URL en tu sitio) para descargar los archivos.');
