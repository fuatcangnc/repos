## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## TuranCMS starter contract

- Keep `src/config/site.json` as the source for site identity, UI tokens, navigation, and i18n selection.
- Keep locale copy in `src/content/locales/<locale>.json`; the setup flow may remove unselected locales or seed a newly selected locale from the starter copy.
- Keep Markdown content below `src/content/<collection>/`. Generic routes make every collection available without adding a page per collection.
- Use `localePath()` for internal links and add matching files under `src/pages/[locale]/` when a page needs a prefixed locale route.
- Use Tailwind utility classes and the existing global tokens; do not commit generated `dist/`, `.astro/`, or `node_modules/` directories.
