import site from "../config/site.json";

const config = site.i18n ?? {};

export const i18nEnabled = config.enabled !== false;
const normalizeLocale = (value) => String(value).trim().toLowerCase();
export const defaultLocale = normalizeLocale(config.defaultLocale ?? "tr");
export const prefixDefaultLocale = config.prefixDefaultLocale === true;
export const locales = Array.from(
  new Set([
    defaultLocale,
    ...(Array.isArray(config.locales) ? config.locales : [defaultLocale]).map(
      normalizeLocale,
    ),
  ]),
);

/** Builds the public path of `path` for `locale`, honoring prefixDefaultLocale. */
export function localePath(locale, path = "/") {
  const [rawPath, hash] = path.split("#");
  const normalized = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  const normalizedLocale = normalizeLocale(locale || defaultLocale);
  const prefixed =
    i18nEnabled && (normalizedLocale !== defaultLocale || prefixDefaultLocale)
      ? `/${normalizedLocale}${withSlash}`
      : withSlash;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** Locales that get their own /<locale>/ folder in src/pages. */
export function prefixedLocales() {
  if (!i18nEnabled) return [];
  return prefixDefaultLocale
    ? locales
    : locales.filter((locale) => locale !== defaultLocale);
}

/**
 * Resolves a collection's locale-specific content folder. The override is
 * intentionally separate from URL routing: some frameworks keep translated
 * content in folders such as `src/content/fr/docs` while their public URL
 * remains `/fr/docs/...`.
 */
export function collectionContentPath(collection, locale = defaultLocale) {
  const definition = site.collections?.[collection];
  if (!definition?.gitPath) return undefined;

  const collectionI18n = definition.i18n;
  if (
    !collectionI18n?.enabled ||
    collectionI18n.strategy !== "path" ||
    !collectionI18n.localePaths
  ) {
    return definition.gitPath;
  }

  return (
    collectionI18n.localePaths[normalizeLocale(locale)] ?? definition.gitPath
  );
}

const messageModules = import.meta.glob("../content/locales/*.json", {
  eager: true,
});
const messages = {};
for (const [filePath, module] of Object.entries(messageModules)) {
  const locale = filePath
    .split("/")
    .pop()
    ?.replace(/\.json$/, "");
  if (locale) messages[locale] = module.default;
}

/** UI copy for `locale`, falling back to the default locale. */
export function getMessages(locale) {
  return (
    messages[locale] ??
    messages[defaultLocale] ??
    Object.values(messages)[0] ??
    {}
  );
}
