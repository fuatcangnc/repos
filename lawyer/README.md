# Lawyer — TuranCMS Astro starter

A multi-page Astro starter for law firms and professional practices. It is designed to be created from the TuranCMS template catalog, then owned and published from the customer’s Git repository.

## Languages

Change `src/config/site.json` during setup to select one language or several:

```json
{
  "i18n": {
    "enabled": true,
    "locales": ["en", "tr"],
    "defaultLocale": "en",
    "prefixDefaultLocale": false
  }
}
```

With `prefixDefaultLocale: false`, English routes are unprefixed (`/practice/`) and Turkish routes are prefixed (`/tr/practice/`). Turning it on prefixes both. Disabling i18n keeps only the unprefixed routes.

## Project structure

```text
├── .sitepins/config.json  # TuranCMS repository contract
├── public/                # static assets and media root
├── src
│   ├── components/pages/  # page sections
│   ├── config/            # site.json and seo.json
│   ├── content/           # Markdown collections and locale copy
│   ├── layouts/           # shared document and content layouts
│   ├── lib/               # locale and generic content routing
│   └── pages/              # default and locale-prefixed routes
└── package.json
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run deploy` | Build locally, then deploy the output with Wrangler |
| `npm run astro ...` | Run Astro CLI commands |

## Content workflow

Add a Markdown file to `src/content/<collection>/`. Its first path segment is the public collection route, so `src/content/projects/office.md` becomes `/projects/office/` after the next Git-connected build. Blog entries use the dedicated `blog` collection and `/blog/<slug>/` routes.

The connected repository remains the source of truth: TuranCMS commits content and configuration changes, while the configured Vercel or Cloudflare integration builds the site.

## Learn more

- [Astro documentation](https://docs.astro.build)
- [Astro routing](https://docs.astro.build/en/guides/routing/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro internationalization](https://docs.astro.build/en/guides/internationalization/)
