# CSV del blog (Webflow)

Coloca aquí los archivos CSV exportados de Webflow:

- Un archivo cuyo nombre contenga **"Blog Categories"** (categorías).
- Un archivo cuyo nombre contenga **"Blog Posts"** (entradas).

Luego ejecuta en la raíz del proyecto:

```bash
npm run import-blog
```

Para usar una carpeta distinta (por ejemplo, tu carpeta Descargas):

```bash
node scripts/import-blog-csv.mjs "/ruta/a/la/carpeta"
```

Se generarán `src/data/categories.json` y `src/data/blog-posts.json`.
