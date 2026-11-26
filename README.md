# Abhishek ♥ Rutika — digital wedding invitation

A mobile-first, bilingual (Marathi primary / English secondary) wedding invitation built with React, TypeScript, Vite and Tailwind CSS. Designed and developed for [Aaiyeji](https://aaiyeji.vercel.app).

The invitation opens with a tap-to-enter cover, plays an original browser-generated tanpura-style score (or your own audio file), and then reveals a single-column heirloom card with the invitation, a live countdown, three events, venue directions and calendar downloads, family details, and WhatsApp sharing.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build on http://localhost:4173
```

No backend, database, API keys or environment variables are required to run locally.

---

## Editing the invitation

**All editable copy lives in [`src/content.ts`](src/content.ts).** Names, dates, times, venues, family members, bilingual text, SEO tags, the hashtag, music and photo settings are defined there. Normal content updates should not require touching any component.

Key places to edit:

| What | Where in `src/content.ts` |
| --- | --- |
| Public URL (sharing, canonical, OG) | `siteUrl` — or set `VITE_SITE_URL` at build time |
| SEO title/description/OG image | `seo` |
| Couple names and monogram | `couple` |
| Wedding date/time (also drives countdown) | `wedding.startISO`, `wedding.endISO` |
| Cover and hero wording | `opening`, `hero` |
| Invitation text and host families | `invitation` |
| Events + calendar timings | `events.list` (`startISO` / `endISO` include `+05:30`) |
| Venue address and map link | `venue` |
| Family members (parents only) | `families.groups` |
| Footer and WhatsApp message | `footer` |
| Brand credit | `brand` |
| Button labels | `ui` |

Every bilingual value has the shape `{ mr: '…', en: '…' }`. Marathi is rendered first and English underneath; the `मराठी | EN` control switches the primary/secondary order and updates `<html lang>`.

### Adding a couple photo

1. Put a JPG/WebP in `public/images/` (for example `public/images/couple.jpg`).
2. Set `photo.src: '/images/couple.jpg'` in `src/content.ts`.
3. Adjust `photo.alt` in both languages if needed.

Leave `photo.src` empty to keep the original monogram arch illustration — this is the current default. The image is lazy-loaded and has a graceful fallback if it fails to load.

### Music

By default, no audio file is used. A gentle tanpura-inspired score is generated live with the Web Audio API only after the opening tap; it has a visible mute/unmute control and respects browser autoplay rules.

To use your own song instead:

1. Add it to `public/audio/` (for example `public/audio/song.mp3`).
2. Set `music.src: '/audio/song.mp3'` and optionally `music.volume` in `src/content.ts`.

Use audio you have the rights to distribute. The generated score has no copyright dependency.

### Brand assets and social preview

`public/icon.svg` is the source mark. `npm run assets` regenerates:

- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- `public/icons/apple-touch-icon.png`
- `public/og-cover.png` (1200 × 630 social preview)

The script uses an installed Chrome/Edge (set `PLAYWRIGHT_CHROMIUM_PATH` to override) and reads its own artwork text from `scripts/generate-assets.mjs`; update the strings there if you change the names or date on the social cover. `scripts/fetch-fonts.mjs` is only needed if you want to re-download the self-hosted font subsets.

`robots.txt` and `sitemap.xml` are generated at build time from `siteUrl` by `vite.config.ts`; do not add static copies to `public/`.

---

## Testing

```bash
npm run lint        # TypeScript only
npm run build       # TypeScript + production Vite build
npm run test:e2e    # Playwright: mobile-375, mobile-414, reduced-motion
```

The Playwright suite covers the opening flow, language switching, countdown numerals, `.ics` downloads, WhatsApp link, clipboard copy, full-page horizontal overflow, tap-target size, and axe (WCAG 2.0/2.1 A/AA) scans of both the cover and the opened invitation. It reuses an installed Chrome/Edge when Playwright's Chromium has not been downloaded.

Manual visual checks are worth doing at **375 × 812** and **414 × 896** (iPhone-sized viewports), in both languages, with reduced motion enabled, and after tapping through the cover. Screenshots produced by the test run are written to `screenshots/`.

### Performance notes

The cover is the only UI mounted on first paint; the full invitation is code-split and loaded when the seal is tapped. The speckled paper texture is a lightweight SVG pattern rather than an expensive `feTurbulence` filter, and all ornamentation is original inline SVG/CSS — no external image services are used.

A Lighthouse 13 mobile audit of the production preview scored **100 performance with unthrottled CPU** (LCP ~1.0 s, TBT 0 ms, CLS 0) and **88 with Lighthouse's default simulated 4× CPU throttle** (LCP 3.9 s, TBT < 100 ms, CLS 0) on a machine with a benchmark index around 1600. Lighthouse's simulated score depends heavily on the host machine's benchmark index and current CPU load; on a slower or busier machine the same build can score lower. Accessibility, Best Practices and SEO scored **100** consistently. Re-run the audit after any content or asset change:

```bash
npm run build
npm run preview
npx lighthouse http://127.0.0.1:4173/ --only-categories=performance,accessibility,best-practices,seo
```

---

## Deploying to Vercel

1. Push this directory to a Git repository and import it in Vercel, **or** run `npx vercel` here.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. After the first deployment, set `VITE_SITE_URL` to the real public URL (for example `https://abhishek-rutika.vercel.app`) in Vercel Project Settings → Environment Variables, then redeploy. This updates canonical links, OG/Twitter URLs, the WhatsApp share text, and generated `robots.txt` / `sitemap.xml`.
4. `vercel.json` already adds long-lived caching for fonts and basic security headers.

The site is fully static; no server-side configuration is needed.

---

## Research takeaways and design assumptions

Reference Marathi wedding invitations and Aaiyeji's own work favour a warm ivory/wine palette, Ganesha blessing, Devanagari-first typography, marigold/toran/rangoli ornament, and an explicit invitation from both families. Those cues are reflected here. Where details were not supplied, sensible defaults were chosen:

- Patil is treated as the groom's side; Chaudhari as the bride's side.
- Haldi: Sunday 26 Dec 2027, 4:00–8:00 PM IST.
- Vivah (muhurat): Monday 27 Dec 2027, 6:45–11:00 PM IST.
- Pritibhoj: Monday 27 Dec 2027, 6:00–11:00 PM IST, after the ceremony.
- All three celebrations are assumed to be at Star Lawns, Bhusawal.
- No RSVP form, phone number, email address or gallery was added, since none was provided.
- English remains visible beneath Marathi rather than being hidden; the toggle promotes the selected language.

### Placeholders to replace before sharing

- `photo.src` is empty: replace with a real photograph or keep the monogram arch.
- `music.src` is empty: keep the original score or add a licensed song.
- `siteUrl` / `VITE_SITE_URL` still uses the example Vercel domain.
- Parent names, event timings, venue address and map link were inferred and should be confirmed with the families.

All of the above (except the generated artwork text in `scripts/generate-assets.mjs` and the static manifest descriptions) are edited in `src/content.ts`.
