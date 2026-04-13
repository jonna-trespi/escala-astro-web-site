#!/usr/bin/env node
/**
 * Converts JPG/PNG under public/ to WebP, removes originals, updates references under src/.
 * Skips icons/escala-favicon.png (broad favicon support).
 * If foo.jpg and foo.png exist in the same folder, converts PNG only and removes both.
 */
import sharp from 'sharp';
import { readdir, unlink, readFile, writeFile } from 'fs/promises';
import { join, extname, dirname, basename, relative } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SRC = join(ROOT, 'src');

const SKIP = new Set(['icons/escala-favicon.png']);
const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);

function normRel(p) {
  return relative(PUBLIC, p).split('\\').join('/');
}

async function* walkRaster(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walkRaster(full);
    } else {
      const ext = extname(e.name).toLowerCase();
      if (RASTER_EXT.has(ext)) yield full;
    }
  }
}

async function* walkSrcFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walkSrcFiles(full);
    else if (/\.(astro|ts|tsx|css|json|md|mjs|js)$/.test(e.name)) yield full;
  }
}

async function main() {
  sharp.cache(false);

  const allFiles = [];
  for await (const f of walkRaster(PUBLIC)) {
    const rel = normRel(f);
    if (SKIP.has(rel)) continue;
    allFiles.push(f);
  }

  /** @type {Map<string, { dir: string, stem: string, png: string|null, jpg: string|null, jpeg: string|null }>} */
  const groups = new Map();
  for (const full of allFiles) {
    const dir = dirname(full);
    const stem = basename(full, extname(full));
    const ext = extname(full).toLowerCase();
    const key = `${dir}\0${stem.toLowerCase()}`;
    if (!groups.has(key)) {
      groups.set(key, { dir, stem, png: null, jpg: null, jpeg: null });
    }
    const g = groups.get(key);
    if (ext === '.png') g.png = full;
    else if (ext === '.jpg') g.jpg = full;
    else if (ext === '.jpeg') g.jpeg = full;
  }

  /** @type {{ from: string, to: string }[]} */
  const conversions = [];
  let converted = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const [, g] of groups) {
    const source = g.png || g.jpg || g.jpeg;
    if (!source) continue;

    const stem = basename(source, extname(source));
    const outWebp = join(g.dir, `${stem}.webp`);
    const isPng = extname(source).toLowerCase() === '.png';

    const bufIn = await readFile(source);
    bytesIn += bufIn.length;

    await sharp(source)
      .webp(
        isPng
          ? { quality: 95, alphaQuality: 100, effort: 5 }
          : { quality: 92, effort: 5 },
      )
      .toFile(outWebp);

    const bufOut = await readFile(outWebp);
    bytesOut += bufOut.length;

    const toUrl = `/${normRel(outWebp)}`;

    for (const p of [g.png, g.jpg, g.jpeg]) {
      if (!p) continue;
      const fromUrl = `/${normRel(p)}`;
      conversions.push({ from: fromUrl, to: toUrl });
      if (p !== outWebp) {
        await unlink(p);
      }
    }

    converted += 1;
  }

  conversions.sort((a, b) => b.from.length - a.from.length);

  const extraRoots = [
    join(ROOT, 'astro.config.mjs'),
    join(PUBLIC, 'index.html'),
  ].filter((p) => existsSync(p));

  let filesTouched = 0;
  for await (const file of walkSrcFiles(SRC)) {
    let text = await readFile(file, 'utf8');
    const orig = text;
    for (const { from, to } of conversions) {
      if (text.includes(from)) text = text.split(from).join(to);
    }
    if (text !== orig) {
      await writeFile(file, text, 'utf8');
      filesTouched += 1;
    }
  }

  for (const file of extraRoots) {
    let text = await readFile(file, 'utf8');
    const orig = text;
    for (const { from, to } of conversions) {
      if (text.includes(from)) text = text.split(from).join(to);
    }
    if (text !== orig) {
      await writeFile(file, text, 'utf8');
      filesTouched += 1;
    }
  }

  const mbIn = (bytesIn / 1e6).toFixed(2);
  const mbOut = (bytesOut / 1e6).toFixed(2);
  const pct = bytesIn ? (((bytesIn - bytesOut) / bytesIn) * 100).toFixed(1) : 0;
  console.log(
    `WebP: ${converted} groups, ${conversions.length} URL mappings, ${filesTouched} source files updated.`,
  );
  console.log(`Size: ~${mbIn} MB raster in → ~${mbOut} MB WebP out (~${pct}% reduction).`);
  console.log('Skipped:', [...SKIP].join(', '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
