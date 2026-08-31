## TuranCMS starter rules

This repository is the clean Astro source used by TuranCMS AI site creation.
Keep it deployable with Cloudflare Workers and keep the Git repository as the
source of truth.

- Use Astro only with the Cloudflare adapter and Tailwind CSS v4.
- Use the local Bejamas components in `src/components/ui` for matching UI.
- Use `@lucide/astro` for icons; do not import `lucide-astro` or add raw SVG icon replacements.
- Keep pages component-based. Do not add CSS modules, page style blocks, or a second styling system.
- Put editable Markdown/MDX in `src/content`; new first-level folders are routable collections.
- Keep site identity, UI tokens, i18n, SEO, and collection paths in `src/config`.
- Keep media in `public/images`.
- Before making UI changes, read the relevant files in `.agents/skills/**/SKILL.md` once per workspace.

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
