import site from '../config/site.json';

const config = site.i18n ?? {};
export const i18nEnabled = config.enabled !== false;
const normalizeLocale = (value: unknown) => String(value).trim().toLowerCase();
export const defaultLocale = normalizeLocale(config.defaultLocale ?? 'en') || 'en';
export const prefixDefaultLocale = config.prefixDefaultLocale === true;
export const locales = Array.from(new Set([
  defaultLocale,
  ...(Array.isArray(config.locales) ? config.locales : [defaultLocale])
    .map(normalizeLocale)
    .filter(Boolean),
]));

/** Builds a URL according to site.json's default-locale path setting. */
export function localePath(locale: string, path = '/') {
  const [rawPath, hash] = path.split('#');
  const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  const currentLocale = normalizeLocale(locale || defaultLocale);
  const prefixed = i18nEnabled && (currentLocale !== defaultLocale || prefixDefaultLocale)
    ? `/${currentLocale}${withSlash}`
    : withSlash;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** Locale folders needed in addition to the default root routes. */
export function prefixedLocales() {
  if (!i18nEnabled) return [];
  return prefixDefaultLocale ? locales : locales.filter((locale) => locale !== defaultLocale);
}

const messageModules = import.meta.glob('../content/locales/*.json', { eager: true });
const messages: Record<string, Record<string, any>> = {};
for (const [filePath, module] of Object.entries(messageModules)) {
  const locale = filePath.split('/').pop()?.replace(/\.json$/, '');
  if (locale) messages[locale] = (module as { default: Record<string, any> }).default;
}

/** Returns the requested locale, then the configured default, then any seed copy. */
export function getMessages(locale: string) {
  return messages[locale] ?? messages[defaultLocale] ?? Object.values(messages)[0] ?? {};
}

export function localeLabel(locale: string) {
  try {
    return new Intl.DisplayNames([locale], { type: 'language' }).of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
}
