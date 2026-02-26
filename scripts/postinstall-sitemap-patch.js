import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, '..', 'node_modules/@astrojs/sitemap/dist/index.js');

function run() {
  try {
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf8');
    if (c.includes('(_routes || []).reduce')) return;
    c = c.replace('const routeUrls = _routes.reduce', 'const routeUrls = (_routes || []).reduce');
    fs.writeFileSync(p, c);
  } catch (_) {}
}
run();
