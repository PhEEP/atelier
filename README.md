# atelier

Systems notes — architecture, agents, and the reasoning behind them. Served at [atelier.pheep.me](https://atelier.pheep.me).

Static site, built with [Eleventy](https://www.11ty.dev/), deployed to GitHub Pages via GitHub Actions on push to `main`.

## Local dev

```sh
pnpm install
pnpm run serve   # local server with live reload
pnpm run build   # writes to _site/
```

## Structure

- `src/posts/*.njk` — post content, one file per post. Front matter drives the masthead, dek, tags, and series nav (set `series` + `seriesPart` + `seriesTotal` to link multi-part posts automatically).
- `src/_includes/base.njk` — shared layout: head/meta, site strip, masthead (generated from front matter), page wrapper.
- `src/css/site.css` — the whole design system: tokens (light + dark via `prefers-color-scheme` and `data-theme`), type scale, panels/callouts/pull-quotes/figures.
- `src/assets/fonts/` — Chivo (display) and JetBrains Mono (code/labels), self-hosted woff2.
- `src/index.njk` — post listing.
- `src/feed.njk` — Atom feed at `/feed.xml`.
- `src/CNAME` — custom domain for GitHub Pages.

## Deploy

Push to `main` → GitHub Actions builds and publishes to GitHub Pages. DNS: `atelier` CNAME record pointing at `<username>.github.io`.
