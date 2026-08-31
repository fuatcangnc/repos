---
name: astro-site-design
description: Build TuranCMS Astro websites with the reference-inspired visual system, reusable page composition, accessible details, and content-driven routes.
---

# TuranCMS Astro Site Design

Use this skill together with `astro` when creating or substantially updating a
TuranCMS Astro starter. The source of truth is the repository, its content
collections, and its `src/config` files. The visual direction is a reusable
system, not a copy of the reference site's words, images, or history.

## Design direction

- Use a confident editorial/agency voice: oversized but readable headings,
  compact navigation, clear section rhythm, and strong content hierarchy.
- Start from a light canvas with near-black ink and one warm accent. Keep the
  palette in tokens in the global Tailwind entrypoint; do not scatter hex
  values through components.
- Prefer white or near-white surfaces, thin neutral dividers, small radii,
  generous whitespace, and a wide centered shell. Use the accent for links,
  active states, labels, and primary actions rather than for decoration.
- Use a deliberate local display/body font when the starter provides one.
  Keep typography legible on Turkish and other configured locale characters.
- Use geometric separators, restrained borders, and large image blocks only
  when they support the site's content. Do not copy reference-specific logos,
  claims, screenshots, or stock assets.

## Composition

Every starter should be assembled from reusable Astro components before adding
page-specific markup:

- one shared `SiteHeader` with desktop navigation and a usable mobile menu;
- one shared `SiteFooter` with the same container, tokens, and locale-aware
  links;
- a page shell/layout that owns metadata, canonical URLs, favicon, and global
  styles;
- reusable hero, section heading, card/list, CTA, media, and detail-page
  primitives;
- explicit hub pages for major collections and generated detail routes for
  entries.

Keep pages thin. A detail route should load one validated collection entry,
pass it to a shared detail component, and use the same header/footer as the
home page. Do not create a separate visual language for blog, services,
projects, or contact pages.

## Astro and TuranCMS contract

- Use `.astro` components first. Add a React island only for real client-side
  state such as a menu, carousel, form, or filter; hydrate the smallest leaf.
- Keep editable content in `src/content/<collection>` and define it in
  `src/content.config.ts`. A route file is not a content collection.
- Use `src/config/site.json` for site identity, navigation, locales, and UI
  tokens. Use `src/config/seo.json` for SEO defaults.
- Store user-managed images in `public/images` and reference them with stable
  public paths and meaningful alt text.
- Keep `.sitepins/config.json` pointing at the real content, media, public, and
  config paths so TuranCMS can discover them.
- Generate collection hubs and detail routes from the collection data. A new
  collection should naturally map to a predictable path such as
  `/services` and `/services/<slug>` without hard-coded entries.
- Keep every internal link locale-aware. Use one page/component implementation
  for all locales and keep locale-specific copy in the repository's locale
  content files.

## Navigation and interaction

- Use the installed Bejamas UI primitive when the interaction matches one:
  `NavigationMenu` for desktop dropdown/mega navigation, `Accordion` for
  stacked disclosure content, `Popover` for anchored temporary panels,
  `Dialog` for protected tasks, and `Carousel` for media sequences.
- Check `package.json` and existing source before importing a component. Use
  the exact installed package path; never invent an import such as
  `lucide-astro` when the project declares `@lucide/astro`.
- Use real icon components with a consistent stroke; never use emoji or text
  glyphs as icons.
- Every control needs an accessible name, keyboard operation, visible focus
  state, hover/active/disabled states, and a sensible mobile equivalent.
- Keep dropdowns and mobile navigation closeable with Escape and usable without
  hover. Never make desktop-only navigation the only way to reach a page.

## Motion and media

- Motion should explain hierarchy or state: reveal important content,
  transition a menu, or give a process a clear progression. Use one or two
  authored moments instead of animating every section.
- Respect `prefers-reduced-motion` and keep all content visible when motion is
  disabled. Avoid client-hydrating the entire page just to animate it.
- Give images stable dimensions or aspect-ratio containers, use intentional
  alt text, and lazy-load below-the-fold media. Avoid layout shift.
- Use Astro assets for bundled media and `public/images` for media that users
  must select or replace from TuranCMS.

## Content and detail pages

- Use real Turkish UTF-8 text and preserve locale characters end-to-end. Do
  not generate mojibake such as `Ã§`, `ÄŸ`, or `Ã¼`.
- A collection hub must explain the collection and expose every entry through
  a clear card/list. Each entry needs a stable slug, title, summary, metadata,
  and a complete detail page.
- Detail pages should include a readable title block, metadata, body/content
  sections, related or next links where useful, and one clear CTA. Preserve
  the shared shell and spacing tokens.
- Keep page copy and navigation in locale files or collection entries rather
  than embedding a second language directly in a component.

## Quality gate

Before accepting a generated or edited site:

1. `npm install` and `npm run build` complete from a clean checkout.
2. Home, every configured locale, collection hub, detail route, and contact
   route render with the shared header/footer.
3. `src/content.config.ts`, `.sitepins/config.json`, `site.json`, and
   `seo.json` agree on paths and locale behavior.
4. No third-party import is missing from `package.json` or its lockfile.
5. Check real copy at mobile and desktop widths for overflow, encoding,
   contrast, focus, loading, empty, and error states.
6. Use the same design tokens and primitives across home, hub, detail, and
   utility pages; do not “fix” one route with a new ad-hoc styling system.
