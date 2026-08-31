# TuranCMS Astro starter

This is the clean Astro starter used when TuranCMS creates a website with AI.
It is generated from Cloudflare's Astro Workers scaffold and includes Tailwind
CSS v4, Bejamas UI, and `@lucide/astro`.

## Structure

```text
.
├── public/images/          # editor-managed media
├── src/components/         # shared site components and Bejamas UI
├── src/config/
│   ├── seo.json            # metadata and robots.txt settings
│   └── site.json           # site identity, UI tokens, i18n, collections
├── src/content/            # Markdown/MDX source of truth
├── src/content.config.ts   # blog plus generic content collection
├── src/layouts/            # document and content layouts
├── src/pages/              # home, blog, locale, and generic collection routes
└── .sitepins/config.json   # TuranCMS folder contract
```

Any first-level folder added under `src/content` becomes a routable collection.
For example, `src/content/projects/case-study.md` is available at
`/projects/case-study/` and its locale-prefixed equivalent when configured.

## Commands

```sh
npm install
npm run dev
npm run build
npm run deploy
```

`npm run deploy` builds the Astro Worker locally and then runs Wrangler. The
Cloudflare dashboard should use the build command `npm run build` and deploy
the generated Worker with its normal Astro/Workers integration.

## Editing contract

- Use Tailwind v4 utility classes for layout, spacing, color, typography, and responsive behavior.
- Use exact local imports such as `@/components/ui/button` and `@/components/ui/navigation-menu`.
- Use icon imports such as `import { ArrowUpRightIcon } from "@lucide/astro"`.
- Keep i18n settings in `src/config/site.json`; the Astro config reads them at build time.
- Keep content schemas compatible with `src/content.config.ts` so TuranCMS can edit frontmatter safely.
