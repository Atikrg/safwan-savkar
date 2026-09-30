# Safwan S. Savkar — Portfolio

A personal portfolio built with Next.js (App Router) and driven entirely by a single
JSON file. The UI is a flat, terminal-inspired "spec sheet": monospace UI, hairline
dividers, no card chrome, and four accent themes with dark/light modes.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npx tsc --noEmit   # type check
npm run lint       # eslint
npm run build      # production build
npm start          # serve the production build
```

## Editing content

Everything renders from [`data/portfolio.json`](data/portfolio.json). No component
edits are needed for copy or ordering changes.

| Key | Drives |
| --- | --- |
| `site` | Metadata, canonical URL, sitemap, OG image, `themeColor` |
| `person` | Name, role, location, email, `initials`, `brandLabel` (header handle) |
| `nav` | Header links and section order |
| `hero` | Terminal prompt line, lede, `session` rows, `status`, CTA buttons, meta chips |
| `about` | Body copy and the stats row |
| `skills` | Skill groups (title, tags, description, icon) |
| `experience` | Timeline jobs (role, org, client, period, bullet points) |
| `project` | Case study: attribution, tags, and the challenge/approach/outcome blocks |
| `certs` | Certifications (with `credentialId` and verify links) |
| `education` | Education section: `lede` plus a list of `entries` (degree, institution, `period`, grade) |
| `contact` | Channel links plus all form copy |
| `footer` | Footer line |
| `themes` | Accent themes offered in the appearance popover |

### Placeholders to fill in

- `site.url` is `https://example.com` with `"urlPlaceholder": true`. Set it to the real
  domain so canonical URLs, the sitemap and `robots.txt` are correct.
- The case study `challenge` and `outcome` blocks are placeholders — the source material
  did not include them.
- Certification `verifyHref` values are placeholders. Add the real Credly/issuer links
  and set `verifyPlaceholder` to `false` so the link reads as verified.
- The hero CTA downloads `/resume.pdf`, which is **not** in the repo. Add your PDF at
  `public/resume.pdf` or change `hero.actions` in the JSON.

## Themes

Seven themes ship in `data/portfolio.json` → `themes`:

- **phosphor** — green CRT (default)
- **amber** — classic terminal amber
- **cyan** — cold blue
- **ice** — pale mint
- **paper** — monochrome, no colour: ink on paper
- **crimson** — mission-control red (errors are amber so they stay distinct)
- **violet** — synthwave purple

Each has a dark and a light variant. The selected pair is stored in `localStorage`
under `ss-theme` and `ss-mode`, and the choice is applied before first paint by an
inline bootstrap script in `app/layout.tsx`. To add or rename a theme, update **all three**
places or it will silently fall back to the default:

1. `themes` in the JSON (drives the picker)
2. the `[data-theme="..."][data-mode="..."]` token blocks in `app/globals.css`
3. the `ok={...}` allow-list in the `BOOTSTRAP` script in `app/layout.tsx`

## Structure

```
app/
  layout.tsx            metadata, JSON-LD Person schema, theme bootstrap, header/footer
  page.tsx              all eight sections
  globals.css           design tokens, theming, nav, buttons, reveal
  sections.module.css   section layouts (hero, timeline, form, ...)
  opengraph-image.tsx   generated OG card
  sitemap.ts robots.ts
components/
  AppearanceControl.tsx  theme + light/dark popover
  SiteHeader.tsx          sticky header, scrollspy, mobile menu
  NetworkCanvas.tsx       hero particle canvas
  RevealObserver.tsx      scroll-reveal (progressive enhancement)
  ContactForm.tsx         validated form that hands off to mailto:
  Icon.tsx                inline SVG icon set
lib/
  types.ts portfolio.ts theme.ts useTheme.ts
data/portfolio.json      all content
```

## Notes

- The canvas is hero-only, pauses when scrolled out of view, and renders static under
  `prefers-reduced-motion: reduce`.
- Content renders without JavaScript; JS only adds the reveal animation and the
  appearance popover.
- The contact form has no backend — it validates in the browser and opens the visitor's
  mail client with the message prefilled.
# safwan-savkar
