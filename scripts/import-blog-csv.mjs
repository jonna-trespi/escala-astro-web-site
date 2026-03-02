/**
 * Importa los CSV de Webflow (Categorías y Blog Posts) y genera
 * src/data/categories.json y src/data/blog-posts.json
 *
 * Uso:
 *   npm run import-blog
 *   (espera los CSV en scripts/csv/)
 *
 * O con ruta custom:
 *   node scripts/import-blog-csv.mjs /ruta/a/carpeta/con/csv
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const csvDir = process.argv[2] || join(projectRoot, 'scripts', 'csv');
const dataDir = join(projectRoot, 'src', 'data');

function parseDate(str) {
  if (!str || typeof str !== 'string') return null;
  const d = new Date(str.trim());
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function formatDisplayDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function findCsvFiles() {
  try {
    const files = await readdir(csvDir);
    const categoriesFile = files.find((f) => f.includes('Blog Categories') && f.endsWith('.csv'));
    const postsFile = files.find((f) => f.includes('Blog Posts') && f.endsWith('.csv'));
    return {
      categories: categoriesFile ? join(csvDir, categoriesFile) : null,
      posts: postsFile ? join(csvDir, postsFile) : null,
    };
  } catch (e) {
    console.error('No se pudo leer la carpeta de CSV:', csvDir, e.message);
    return { categories: null, posts: null };
  }
}

async function main() {
  console.log('Buscando CSV en:', csvDir);
  const { categories: catPath, posts: postsPath } = await findCsvFiles();

  if (!catPath) {
    console.error('No se encontró el CSV de Categorías. Coloca el archivo en scripts/csv/ o pasa la ruta como argumento.');
    process.exit(1);
  }
  if (!postsPath) {
    console.error('No se encontró el CSV de Blog Posts. Coloca el archivo en scripts/csv/ o pasa la ruta como argumento.');
    process.exit(1);
  }

  const catRaw = await readFile(catPath, 'utf-8');
  const postsRaw = await readFile(postsPath, 'utf-8');

  const categoryRows = parse(catRaw, { columns: true, skip_empty_lines: true, relax_column_count: true });
  const postRows = parse(postsRaw, { columns: true, skip_empty_lines: true, relax_column_count: true });

  const categories = categoryRows.map((row) => ({
    slug: (row['Slug'] || '').trim(),
    name: (row['Name'] || '').trim(),
  })).filter((c) => c.slug && c.name);

  const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  const fallbackCategoryNames = { cloud: 'Cloud' };

  const posts = postRows.map((row) => {
    const slug = (row['Slug'] || '').trim();
    const categorySlug = (row['Category'] || '').trim().toLowerCase();
    const publishedOn = parseDate(row['Published On'] || row['Created On']);
    return {
      slug,
      title: (row['Name'] || '').trim(),
      excerpt: (row['Short Description'] || '').trim(),
      thumbnail: (row['Thumbnail'] || '').trim() || null,
      previewImage: (row['Preview Image'] || row['Thumbnail'] || '').trim() || null,
      content: (row['Post Content'] || '').trim() || '',
      categorySlug: categorySlug || null,
      categoryName: categoryBySlug[categorySlug] || fallbackCategoryNames[categorySlug] || categorySlug || 'Blog',
      featured: String(row['Featured'] || '').toUpperCase() === 'TRUE',
      publishedOn,
      publishedOnFormatted: publishedOn ? formatDisplayDate(publishedOn) : '',
    };
  }).filter((p) => p.slug && p.title);

  posts.sort((a, b) => (b.publishedOn || '').localeCompare(a.publishedOn || ''));

  await mkdir(dataDir, { recursive: true });
  await writeFile(join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2), 'utf-8');
  await writeFile(join(dataDir, 'blog-posts.json'), JSON.stringify(posts, null, 2), 'utf-8');

  console.log('OK: Categorías:', categories.length);
  console.log('OK: Posts:', posts.length);
  console.log('Generados: src/data/categories.json, src/data/blog-posts.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
