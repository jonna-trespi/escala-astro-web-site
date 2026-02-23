# Internacionalización (i18n)

## Idiomas

- **es** (español): rutas en la raíz (`/`, `/nosotros`, `/partner`, …).
- **en** (inglés): prefijo `/en/` (`/en/`, `/en/nosotros`, …).
- **pt** (portugués): prefijo `/pt/` (`/pt/`, `/pt/nosotros`, …).

## Cómo añadir una nueva página en inglés o portugués

1. Crear `src/pages/en/<nombre>.astro` o `src/pages/pt/<nombre>.astro`.
2. En el frontmatter definir `lang = 'en'` o `lang = 'pt'` y `currentPath = Astro.url.pathname`.
3. Pasar al Header: `<Header lang={lang} currentPath={currentPath} />`.
4. El contenido puede copiarse de la página en español y luego traducirse; los enlaces internos deben usar el prefijo del idioma (p. ej. `/${lang}/nosotros` cuando `lang !== 'es'`).

## Traducciones

- **Nav y footer:** `src/i18n/es.json`, `en.json`, `pt.json`.
- Añadir claves nuevas en los tres JSON para mantener los tres idiomas.
- En componentes: `getT(dict)('nav.clave')` con el diccionario del idioma actual.

## Rutas actuales

- **Español (raíz):** `src/pages/*.astro` → `/`, `/nosotros`, `/partner`, etc.
- **Inglés:** `src/pages/en/*.astro` → `/en/`, `/en/nosotros`, `/en/partner`, etc.
- **Portugués:** `src/pages/pt/*.astro` → `/pt/`, `/pt/nosotros`, `/pt/partner`, etc.

Todas las páginas tienen versión en los tres idiomas. El contenido visible en cada página es aún el mismo (español); solo el menú y el selector de idioma cambian según `lang`. Para traducir el cuerpo de cada página, hay que usar las claves de los JSON y el helper `getT(dict)` en cada plantilla.
