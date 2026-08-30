import site from '../config/site.json';

const config = site.i18n ?? {};

export const defaultLocale = config.defaultLocale ?? 'tr';
export const prefixDefaultLocale = config.prefixDefaultLocale === true;
export const locales = Array.from(
	new Set([defaultLocale, ...(config.locales ?? [defaultLocale])]),
);

/** Builds the public path of `path` for `locale`, honoring prefixDefaultLocale. */
export function localePath(locale, path = '/') {
	const [rawPath, hash] = path.split('#');
	const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
	const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
	const prefixed =
		locale !== defaultLocale || prefixDefaultLocale
			? `/${locale}${withSlash}`
			: withSlash;
	return hash ? `${prefixed}#${hash}` : prefixed;
}

/** Locales that get their own /<locale>/ folder in src/pages. */
export function prefixedLocales() {
	return prefixDefaultLocale
		? locales
		: locales.filter((locale) => locale !== defaultLocale);
}

const messageModules = import.meta.glob('../content/locales/*.json', {
	eager: true,
});
const messages = {};
for (const [filePath, module] of Object.entries(messageModules)) {
	const locale = filePath.split('/').pop()?.replace(/\.json$/, '');
	if (locale) messages[locale] = module.default;
}

/** UI copy for `locale`, falling back to the default locale. */
export function getMessages(locale) {
	return (
		messages[locale] ?? messages[defaultLocale] ?? Object.values(messages)[0] ?? {}
	);
}
