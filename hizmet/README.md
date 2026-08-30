# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🌍 Internationalization

The starter uses [Astro i18n routing](https://docs.astro.build/en/guides/internationalization/) and is configured entirely from `src/config/site.json`:

```json
"i18n": {
  "enabled": true,
  "locales": ["tr", "en"],
  "defaultLocale": "tr",
  "prefixDefaultLocale": false
}
```

- `enabled: false` disables locale routing and serves only the default site paths.
- With `prefixDefaultLocale: false`, the default locale is unprefixed (`/iletisim/`) and other locales are prefixed (`/en/iletisim/`).
- With `prefixDefaultLocale: true`, every locale is prefixed (`/tr/iletisim/`, `/en/iletisim/`).
- UI copy lives in `src/content/locales/<locale>.json`. Adding a locale means adding it to `i18n.locales` and creating the matching JSON file.

Collection folders can opt into path-based locale overrides without changing
the public URL structure:

```json
"collections": {
  "blog": {
    "gitPath": "src/content/blog",
    "i18n": {
      "enabled": true,
      "strategy": "path",
      "localePaths": {
        "fr": "src/content/fr/blog"
      }
    }
  }
}
```

The same collection metadata is mirrored in `.sitepins/config.json` so
TuranCMS can preserve it while creating and editing a repository.

TuranCMS writes this configuration automatically when you pick locales while starting from this template.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
