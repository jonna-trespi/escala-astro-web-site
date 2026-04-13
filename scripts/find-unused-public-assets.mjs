#!/usr/bin/env node
/**
 * Finds public/ files not referenced in src/, astro.config.mjs, or public/index.html.
 * Does not delete — prints paths for review. Run with --delete to remove unused (except allowlist).
 */
import { readdir, readFile, unlink, rmdir } from 'fs/promises';
import { join, relative } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SRC = join(ROOT, 'src');

const NEVER_DELETE = new Set([
  '_headers',
  '_redirects',
  'robots.txt',
  'index.html',
  'icons/escala-favicon.png',
]);

const TEXT_EXT = /\.(astro|ts|tsx|js|mjs|cjs|css|scss|json|md|html|svg)$/i;

async function* walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walkFiles(full);
    else yield full;
  }
}

async function* walkSrc(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walkSrc(full);
    else if (TEXT_EXT.test(e.name)) yield full;
  }
}

async function main() {
  const allRels = [];
  for await (const abs of walkFiles(PUBLIC)) {
    allRels.push(relative(PUBLIC, abs).split('\\').join('/'));
  }
  /** basename (filename only) -> how many public files use it */
  const basenameCount = new Map();
  for (const r of allRels) {
    const bn = r.includes('/') ? r.slice(r.lastIndexOf('/') + 1) : r;
    basenameCount.set(bn, (basenameCount.get(bn) || 0) + 1);
  }

  const corpusParts = [];
  for await (const f of walkSrc(SRC)) {
    corpusParts.push(await readFile(f, 'utf8'));
  }
  const extra = [join(ROOT, 'astro.config.mjs'), join(PUBLIC, 'index.html')];
  for (const p of extra) {
    if (existsSync(p)) corpusParts.push(await readFile(p, 'utf8'));
  }
  const corpus = corpusParts.join('\n');

  const unused = [];
  const used = [];

  for await (const abs of walkFiles(PUBLIC)) {
    const rel = relative(PUBLIC, abs).split('\\').join('/');
    if (rel === '.DS_Store' || rel.endsWith('/.DS_Store')) {
      unused.push({ abs, rel, reason: '.DS_Store' });
      continue;
    }
    if (NEVER_DELETE.has(rel)) {
      used.push(rel);
      continue;
    }

    const needles = new Set([`/${rel}`, rel]);
    if (rel.includes(' ')) {
      needles.add(`/${rel.replace(/ /g, '%20')}`);
    }
    needles.add(`/${encodeURI(rel).replace(/#/g, '%23')}`);
    // Same path, other raster extension (e.g. Header still lists .png while file is .webp)
    const dot = rel.lastIndexOf('.');
    if (dot > 0) {
      const stem = rel.slice(0, dot);
      for (const ext of ['.webp', '.png', '.jpg', '.jpeg', '.gif']) {
        needles.add(`/${stem}${ext}`);
      }
    }

    let found = [...needles].some((n) => corpus.includes(n));
    // Dynamic paths e.g. `/icons/menu/${subitem.icon}` — match basename + ext variants
    const baseName = rel.includes('/') ? rel.slice(rel.lastIndexOf('/') + 1) : rel;
    if (!found && (basenameCount.get(baseName) || 0) === 1) {
      const bd = baseName.lastIndexOf('.');
      const baseStem = bd > 0 ? baseName.slice(0, bd) : baseName;
      for (const ext of ['.webp', '.png', '.jpg', '.jpeg', '.gif']) {
        if (corpus.includes(`${baseStem}${ext}`)) {
          found = true;
          break;
        }
      }
    }
    if (found) used.push(rel);
    else unused.push({ abs, rel, reason: 'no string match in corpus' });
  }

  console.log(JSON.stringify({ unusedCount: unused.length, usedCount: used.length }, null, 0));
  for (const u of unused) {
    console.log(u.rel);
  }

  if (process.argv.includes('--delete')) {
    for (const u of unused) {
      await unlink(u.abs);
      console.error('deleted:', u.rel);
    }
    // Remove empty dirs under public (best effort)
    const { execSync } = await import('child_process');
    try {
      execSync(`find "${PUBLIC}" -type d -empty -delete`, { stdio: 'inherit' });
    } catch {
      /* ignore */
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
