---
name: astro
description: Create and maintain TuranCMS-compatible Astro starter templates with i18n, content collections, Git configuration, and Cloudflare/Vercel build support.
---

# TuranCMS Astro Template Rules

Use this skill when creating or updating a starter template under repos/,
preparing a template for the TuranCMS catalog, or converting a site into the
Astro Website Build Kit structure.

## Target outcome

Create a repository that:

- is a real Astro project and can be created from the Astro Cloudflare starter
- keeps Git as the source of truth
- exposes its content to the TuranCMS admin panel
- supports the selected locales without duplicating page logic
- builds for Cloudflare Workers and Vercel
- remains useful without TuranCMS

Do not create a mock folder tree that only looks like Astro. The template must
install, build, and render its routes from the committed files.

## Starter creation

For a new Astro starter, begin from the official Cloudflare Astro scaffold when
the template requires a clean project:

~~~bash
npm create cloudflare@latest -- my-astro-app --framework=astro
~~~

Then adapt the generated project to the template's design and TuranCMS
contract. Do not copy a template repository's Git history into a customer's
repository. When the template is stored as a folder in the shared repos
repository, the folder must be self-contained because TuranCMS copies its
files into a new repository.

## Required TuranCMS contract

Every TuranCMS-compatible Astro template must include this file:

~~~text
.sitepins/config.json
~~~

Use these defaults unless the template intentionally has a different layout:

~~~json
{
  "content": "src/content",
  "media": "public/images",
  "public": "public",
  "configs": ["src/config"],
  "arrangement": [],
  "customCommit": false
}
~~~

This file is not optional. TuranCMS reads it to populate the Content, Media
and Config sections. If it is missing, an existing src/content directory can
still be present in Git while the admin panel shows no content.

The template must also keep these paths real:

~~~text
src/content/
src/content.config.ts
public/images/
src/config/site.json
src/config/seo.json
~~~

Empty directories need a tracked .gitkeep. Do not rename these paths without
also changing .sitepins/config.json and testing the admin tree.

## Content collections

Use Astro content collections for editorial content. The default blog
collection should read Markdown and MDX from src/content/blog and define a
strict schema for fields used by the editor:

- title
- description
- publishedAt or the backward-compatible pubDate
- updatedAt
- author
- image and imageAlt
- categories
- draft

Keep the loader and schema in src/content.config.ts. Provide at least one
sample Markdown file or a tracked .gitkeep so the collection path survives a
clean clone. Never place a page only in src/pages and call it content; pages
are route files, while editable entries belong in a collection.

When a file is edited from TuranCMS, its frontmatter and body must remain valid
for the collection schema. Avoid schema fields that are silently accepted by
the UI but rejected by astro build.

## Internationalization

Drive the locale list from src/config/site.json:

~~~json
{
  "i18n": {
    "locales": ["tr", "en"],
    "defaultLocale": "tr",
    "prefixDefaultLocale": false
  }
}
~~~

The Astro config must read this value and configure i18n.locales,
i18n.defaultLocale, and the default-locale prefix behavior. Keep locale
message files at the path used by the TuranCMS template flow:

~~~text
src/content/locales/tr.json
src/content/locales/en.json
~~~

The default locale must always have a message file. The template setup flow
may create or copy message files for selected locales, so do not hard-code a
single locale in a way that breaks that flow.

Use one shared component per page and resolve copy with the current locale.
Locale route files should be thin wrappers that provide getStaticPaths for the
locales that receive prefixed routes. Do not duplicate an entire page for each
language.

Keep internal links locale-aware. A link to /hizmetler/ must be generated
through the locale path helper when the current locale is prefixed.

## Route and component structure

Prefer this predictable structure:

~~~text
src/
├── components/
│   └── pages/
├── config/
├── content/
│   ├── blog/
│   └── locales/
├── layouts/
├── lib/
│   └── i18n/
├── pages/
├── styles/
└── content.config.ts
~~~

Use .astro components first. Use React, Vue or another island only for real
client-side state or interaction. Hydrate the smallest leaf component with
client:visible, client:idle, or client:load according to its priority. Do not
hydrate the entire layout for a menu or form.

Use semantic header, nav, main, section, article and footer elements. Every
interactive control needs a keyboard-accessible native control, an accessible
name, visible focus state and a meaningful mobile behavior. Images need
intentional alt text and stable dimensions or containers.

## Styling and assets

For official Website Build Kit templates, use Tailwind CSS v4 with a
CSS-first entry file and keep repeated values as design tokens. Avoid adding a
second styling system or scattered one-off global CSS. Existing imported
designs may preserve their established scoped styles until they are
deliberately migrated.

Keep authored assets in src/assets and public URLs in public. Imported media
that users must manage from TuranCMS belongs under public/images. Use stable,
repository-relative paths in Markdown and config files.

## Site, SEO and deployment files

src/config/site.json is the public site identity and must be safe to edit from
TuranCMS. Keep site name, description, URL, branding and navigation there.
Store SEO defaults in src/config/seo.json when the template supports SEO
settings.

For Cloudflare-compatible output:

- use @astrojs/cloudflare
- prefer output: static for content sites
- set site only from a configured public URL
- use @astrojs/sitemap when a public URL exists
- keep wrangler.jsonc pointed at ./dist through the assets binding
- do not add a Worker main entry point for a static assets deployment

The build must happen before Wrangler:

~~~bash
npm run build
npx wrangler deploy
~~~

The Vercel/Cloudflare Git integration may run this build itself. A template
must not require an end user's provider API token merely to publish a normal
Git commit.

## Runtime boundaries

Astro pages should work in Cloudflare's runtime. Do not use Node-only APIs such
as node:fs or node:path in request-time page, layout, component or endpoint
code. File generation and inspection belong in build-time scripts or Vite
plugins. Keep secrets out of public, client bundles, site config, Markdown,
and Git.

## Validation before a template is ready

From the template directory:

~~~bash
npm install
npm run build
~~~

Check all of the following after the build:

1. The home page, every configured locale route and every navigation target
   render.
2. src/content/blog produces at least one valid collection entry.
3. .sitepins/config.json points to real content, media, public and config
   paths.
4. src/content.config.ts accepts the sample frontmatter.
5. dist/ is generated and wrangler.jsonc points to it.
6. Favicon, SEO metadata, sitemap and robots output do not contain stale
   example values.
7. No .env, secret, node_modules, .astro, dist or .wrangler output is added to
   the template commit.

Use the repository's astro dev --background convention for manual browser
checks. Stop the background server after the check with astro dev stop.

Do not push or deploy a template unless the user explicitly asks for it. When
the template is part of the shared repos source repository, stage only the
intended template files and keep unrelated skill or workspace files out of
the commit.
