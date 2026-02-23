export const locales = ['es', 'en', 'pt'] as const;
export type Locale = (typeof locales)[number];

/** Lookup en un diccionario por clave con puntos: "nav.company" */
export function getT(dict: Record<string, unknown>) {
  return (key: string, fallback = ''): string => {
    const keys = key.split('.');
    let obj: unknown = dict;
    for (const k of keys) {
      if (obj != null && typeof obj === 'object' && k in obj) obj = (obj as Record<string, unknown>)[k];
      else return fallback || key;
    }
    return typeof obj === 'string' ? obj : (fallback || key);
  };
}

/** Prefijo de ruta por idioma: es = "", en = "/en", pt = "/pt" */
export function localePrefix(lang: Locale): string {
  return lang === 'es' ? '' : `/${lang}`;
}

/** Dada la pathname actual, devuelve la path en otro idioma */
export function pathForLocale(currentPath: string, newLang: Locale): string {
  const withoutLocale = currentPath.replace(/^\/(en|pt)\//, '/').replace(/^\/(en|pt)$/, '/') || '/';
  const prefix = localePrefix(newLang);
  return prefix === '' ? withoutLocale : `${prefix}${withoutLocale === '/' ? '' : withoutLocale}`;
}
