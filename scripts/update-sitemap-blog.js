import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = 'https://www.escala24x7.com';
const root = path.join(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src/data/blog-posts.json'), 'utf8'));
const slugs = posts.map((p) => p.slug);

const current = fs.readFileSync(path.join(root, 'seo-files/sitemap-0.xml'), 'utf8');
const urlRegex = /<url><loc>[^<]+<\/loc><\/url>/g;
const urlMatches = current.match(urlRegex) || [];

const blogEntries = [];
for (const slug of slugs) {
  blogEntries.push('<url><loc>' + base + '/blog/' + slug + '/</loc></url>');
  blogEntries.push('<url><loc>' + base + '/en/blog/' + slug + '/</loc></url>');
  blogEntries.push('<url><loc>' + base + '/pt/blog/' + slug + '/</loc></url>');
}

const allEntries = urlMatches.concat(blogEntries);
const urlset =
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' +
  allEntries.join('') +
  '</urlset>';
fs.writeFileSync(path.join(root, 'seo-files/sitemap-0.xml'), urlset);
console.log('Written', urlMatches.length, 'existing +', blogEntries.length, 'blog =', allEntries.length, 'total URLs');
