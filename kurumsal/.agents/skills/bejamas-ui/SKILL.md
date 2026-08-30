---
name: bejamas-ui
description: Enforce Bejamas UI components and Astro conventions for every UI change in TuranCMS starter repositories.
---

# Bejamas UI rules

Use this skill whenever you create, edit, or review UI in an Astro starter
managed by TuranCMS. Bejamas UI is the repository's required component
library. Keep the repository's existing visual language and compose the
installed components instead of replacing them with hand-written equivalents.

## Required workflow

1. Read this skill once when the repository workspace opens. Do not rescan
   `.agents` on every request; use the supplied one-time repository snapshot.
2. Inspect `components.json` and the existing files in `src/components/ui/`
   before changing an interface. Use the exact local import path and API found
   in those files.
3. If the requested control has a Bejamas equivalent, use that component and
   its existing variants, subcomponents, and wrappers. Do not hand-roll the
   equivalent with raw HTML, custom CSS, or another UI library.
4. If a required component is missing, add it through the official registry
   command (`npx bejamas@latest add <component>`) and then use the generated
   local component. Do not silently substitute another component system.
5. Keep the Astro + Tailwind CSS v4 setup intact. Prefer semantic HTML,
   accessible names, keyboard behavior, visible focus states, and the tokens
   already provided by Bejamas UI. Keep client JavaScript limited to behavior
   that cannot be progressive enhancement.

The rule applies to both new UI and refactors: a matching Bejamas component
is mandatory even when the requested change appears small. Existing project
components may wrap Bejamas primitives; extend the wrapper when it already
owns the product behavior instead of duplicating it.

## Available component inventory

These Bejamas UI components are installed or available in the TuranCMS Astro
starter. Use the local `@/components/ui/<component>` alias when it exists:

- accordion
- alert
- avatar
- badge
- breadcrumb
- button
- button-group
- card
- carousel
- checkbox
- collapsible
- combobox
- command
- date
- dialog
- dropdown-menu
- field
- hover-card
- input
- input-group
- item
- kbd
- label
- link-group
- marquee
- native-select
- navigation-menu
- popover
- radio-group
- select
- semantic-icon
- separator
- skeleton
- slider
- spinner
- sticky-surface
- switch
- table
- tabs
- textarea
- toggle
- toggle-group
- tooltip

Use the component's barrel export and documented subcomponents where provided,
for example `@/components/ui/card` or `@/components/ui/dialog`. Do not import
from package internals or recreate missing interaction logic. Preserve
`data-slot` hooks and the component's accessibility behavior.

## Installation and verification

For a new Astro project, initialize the library with the official command:

```bash
npx bejamas@latest init --template astro
npx bejamas@latest add --all
```

The project must have Tailwind CSS v4, the `@/*` import alias, a valid
`components.json`, and the Bejamas base stylesheet imported by the global
stylesheet. Run the project's normal build after adding or changing a
component. Never overwrite unrelated project files just to rerun init.

Official documentation: https://ui.bejamas.com/docs/installation
