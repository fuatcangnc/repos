// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// bejamas:astro-fonts:start
/** @type {NonNullable<import("astro/config").AstroUserConfig["fonts"]>} */
const BEJAMAS_ASTRO_FONTS = [
  {
    provider: fontProviders.google(),
    name: "Inter",
    cssVariable: "--font-sans",
    subsets: ["latin"],
  },
];
// bejamas:astro-fonts:end

// Internationalization is driven by src/config/site.json so TuranCMS (or any
// editor) can add locales without touching this file:
// https://docs.astro.build/en/guides/internationalization/
const siteConfig = JSON.parse(
  readFileSync(new URL("./src/config/site.json", import.meta.url), "utf8"),
);
const i18nConfig = siteConfig.i18n ?? {};
const i18nEnabled = i18nConfig.enabled !== false;
const normalizeLocale = (value) => String(value).trim().toLowerCase();
const defaultLocale = normalizeLocale(i18nConfig.defaultLocale ?? "tr") || "tr";
const locales = Array.from(
  new Set([
    defaultLocale,
    ...(Array.isArray(i18nConfig.locales)
      ? i18nConfig.locales
      : [defaultLocale]
    )
      .map(normalizeLocale)
      .filter(Boolean),
  ]),
);

// https://astro.build/config
export default defineConfig({
  fonts: BEJAMAS_ASTRO_FONTS,
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  ...(i18nEnabled
    ? {
        i18n: {
          locales,
          defaultLocale,
          routing: {
            prefixDefaultLocale: i18nConfig.prefixDefaultLocale === true,
            redirectToDefaultLocale: i18nConfig.prefixDefaultLocale === true,
          },
        },
      }
    : {}),
});
