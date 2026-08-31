// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = JSON.parse(
  readFileSync(new URL("./src/config/site.json", import.meta.url), "utf8"),
);
const i18n = site.i18n ?? {};
const normalizeLocale = (value) => String(value).trim().toLowerCase();
const defaultLocale = normalizeLocale(i18n.defaultLocale ?? "en") || "en";
const locales = Array.from(
  new Set([
    defaultLocale,
    ...(Array.isArray(i18n.locales) ? i18n.locales : [defaultLocale])
      .map(normalizeLocale)
      .filter(Boolean),
  ]),
);
const i18nEnabled = i18n.enabled !== false;
const siteUrl =
  typeof site.url === "string" && site.url.trim() ? site.url : undefined;

export default defineConfig({
  output: "static",
  site: siteUrl,
  adapter: cloudflare(),
  vite: { plugins: [tailwindcss()] },
  integrations: siteUrl ? [sitemap()] : [],
  ...(i18nEnabled
    ? {
        i18n: {
          locales,
          defaultLocale,
          routing: {
            prefixDefaultLocale: i18n.prefixDefaultLocale === true,
          },
        },
      }
    : {}),
});
