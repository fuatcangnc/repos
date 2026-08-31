---
name: astro-site-design
description: Build TuranCMS Astro websites with the reference-inspired visual system, reusable page composition, accessible details, and content-driven routes.
---

# TuranCMS Astro Site Design

Use this skill for every visual or structural change in this starter. Keep the
repository as the source of truth and use the existing `src/config`,
`src/content`, and `.sitepins` contract.

## Visual rules

- Use a light editorial/agency system: generous whitespace, oversized readable
  headings, near-black ink, white surfaces, thin neutral dividers, small
  radii, and one warm accent token.
- Use the same centered shell, typography, spacing, and tokens on home, hub,
  detail, blog, and contact pages. Do not copy reference-specific copy,
  logos, screenshots, or assets.
- Use real local font files when available and verify Turkish characters render
  as UTF-8. Never introduce mojibake such as `Ã§`, `ÄŸ`, or `Ã¼`.

## Astro structure

- Prefer `.astro`; hydrate only the smallest interactive leaf.
- Keep editable entries in `src/content/<collection>` with schemas in
  `src/content.config.ts`. Generate collection hubs and stable slug detail
  routes instead of hard-coding entries in page files.
- Keep identity, navigation, locales, and UI tokens in `src/config/site.json`,
  SEO defaults in `src/config/seo.json`, and user-managed images in
  `public/images`.
- Preserve `.sitepins/config.json`, the shared header/footer/layout, and
  locale-aware links for every configured locale.

## Components and interactions

- Reuse the shared header, footer, hero, section, card/list, CTA, media, and
  detail primitives. A detail route should pass validated content to a shared
  component rather than inventing a new page shell.
- Use installed Bejamas UI primitives for matching interactions: NavigationMenu
  for dropdown/mega navigation, Accordion for disclosures, Popover for anchored
  panels, Dialog for protected tasks, and Carousel for media sequences.
- Inspect `package.json` before imports. Use exact installed icon paths, with
  `@lucide/astro` when that is the declared package; never use emoji as icons.
- Every control must be keyboard accessible, named, focus-visible, responsive,
  and usable without hover. Respect reduced motion and provide stable image
  dimensions and meaningful alt text.

## Review

Run `npm install` and `npm run build` from a clean checkout. Check all locale
routes, collection hubs, detail pages, metadata, content paths, and the shared
navigation. Do not leave missing dependencies, one-off CSS systems, overflow,
encoding errors, or stale example values.
