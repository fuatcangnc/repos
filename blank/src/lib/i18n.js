import site from "../config/site.json";

const config = site.i18n ?? {};
const normalizeLocale = (value) => String(value).trim().toLowerCase();

export const i18nEnabled = config.enabled !== false;
export const defaultLocale = normalizeLocale(config.defaultLocale ?? "en") || "en";
export const prefixDefaultLocale = config.prefixDefaultLocale === true;
export const locales = Array.from(
  new Set([
    defaultLocale,
    ...(Array.isArray(config.locales) ? config.locales : [defaultLocale])
      .map(normalizeLocale)
      .filter(Boolean),
  ]),
);

export function localePath(locale, path = "/") {
  const [rawPath, hash] = String(path).split("#");
  const normalized = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  const normalizedLocale = normalizeLocale(locale || defaultLocale);
  const prefix =
    i18nEnabled &&
    (normalizedLocale !== defaultLocale || prefixDefaultLocale)
      ? `/${normalizedLocale}`
      : "";
  return hash ? `${prefix}${withSlash}#${hash}` : `${prefix}${withSlash}`;
}

export function prefixedLocales() {
  if (!i18nEnabled) return [];
  return prefixDefaultLocale
    ? locales
    : locales.filter((locale) => locale !== defaultLocale);
}

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
  const locale = filePath.split("/").pop()?.replace(/\.json$/, "");
  if (locale) messages[locale] = module.default;
}

export function getMessages(locale) {
  return messages[locale] ?? messages[defaultLocale] ?? {};
}
