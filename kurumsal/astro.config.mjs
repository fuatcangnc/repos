// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// Internationalization is driven by src/config/site.json so TuranCMS (or any
// editor) can add locales without touching this file:
// https://docs.astro.build/en/guides/internationalization/
const siteConfig = JSON.parse(
	readFileSync(new URL('./src/config/site.json', import.meta.url), 'utf8'),
);
const i18nConfig = siteConfig.i18n ?? {};
const defaultLocale = i18nConfig.defaultLocale ?? 'tr';
const locales = Array.from(
	new Set([defaultLocale, ...(i18nConfig.locales ?? [defaultLocale])]),
);

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare(),
	i18n: {
		locales,
		defaultLocale,
		routing: {
			prefixDefaultLocale: i18nConfig.prefixDefaultLocale === true,
			redirectToDefaultLocale: i18nConfig.prefixDefaultLocale === true,
		},
	},
});
