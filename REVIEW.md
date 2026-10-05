# Wedding site review

Review only — no site code was changed. Based on reading every component, `app/globals.css`, `app/layout.tsx`, `lib/config.ts` and the image assets. **Not checked in a rendered browser**, so visual notes come from the code and the images.

## Verdict

The hero is strong and distinctive: the card artwork, guest personalisation and live countdown. The content model is well built (`lib/config.ts`, `?to=` and `?events=` links). Below the hero, the page falls back to a generic template look and leaves out practical guest information. The biggest practical gap is link previews, since WhatsApp is how this will be shared.

## P0 — fix before sending invites

1. **No share preview image.** `app/layout.tsx` has OG title and description but no `og:image`, `twitter:card`, `metadataBase` or `theme-color`. WhatsApp will show a plain text link. Add a 1200×630 crop of the card.
2. **Countdown uses the viewer's timezone.** `new Date(2026, 11, 19, 19, 0)` is local time, so a guest abroad counts down to 7 PM *their* time. Use `new Date("2026-12-19T19:00:00+05:30")`.
3. **The error text promises WhatsApp, but there is no contact anywhere.** The RSVP failure message says "WhatsApp us directly". Add a contact line or number (in config).
4. **RSVP can silently fail.** `fetch(..., mode: "no-cors")` always resolves, so guests always see the thank-you even if the Google Form rejects the submission. Test once end to end, and consider a fallback or confirmation.
5. **The page is publicly indexable.** It contains family names, dates and venue. Add `robots: { index: false }` unless it should appear in search.
6. **Low-res photos upscaled, heavy photos on mobile.** `overview-shot.jpeg` is 480×360 and `british_kothi.jpeg` is 547×365, but they display ~680px wide (blurry on retina). `regal_hall.jpg` (1920px, 300 KB) and `pool-dusk-shot.jpg` (290 KB) are heavy for phones. Get larger originals for the two small ones, and resize all to ~1200px.

## P1 — design

1. **Hero vs the rest of the page.** The hero is the memorable thing. Below it, every section has the same centered title with a `✦` rule, followed by identical rounded cards with the same shadow and a hover lift. That is the generic card-kit look. Carry the hero's motifs through instead: gold linework, the butterfly, and arches. The Kothi and hotel photos already have arches, so arch-shaped image masks would tie the venue photos to the card.
2. **Emoji as the icon system** (🌼 💍 ✨ 🏡 📍 🎊 😔 🎉, plus falling 🍃🌿 petals). They render differently per device and clash with the refined green and gold. Replace with small SVG line icons or drop them; make the petals SVG or remove them.
3. **Hover lift on non-clickable cards** suggests they are links. Remove it, or make the whole card the tap target.
4. **Repeated venue.** All three events show the same venue and the same Maps link. State the venue once (one venue block with the best photo and one map button) and let the event cards carry date, time, dress and note.
5. **Typography.** Cormorant Garamond + Jost is tasteful but a very common wedding pairing, and it doesn't echo the calligraphy on the card. Consider matching headings to the card's lettering and keeping Jost for body text. Countdown labels (0.6rem ≈ 9.6px) and tags (0.72rem) are too small.
6. **Date format.** The hero shows `19 · 12 · 2026`, which is ambiguous for guests used to month-first dates. Use "19 December 2026".
7. **Desktop layout.** A single 720px column leaves wide empty margins. That is fine for mobile (the main use), but on wide screens the events could read as a dated timeline.
8. **Motion.** The only ambient motion is the constantly falling emoji. Prefer one deliberate reveal. The `.fadeUp` and `.d1`–`.d4` classes are unused.

## P1 — content and information gaps

- **Getting there:** airport or station, travel time, parking. Add-to-calendar buttons. One named contact person.
- **Stay section is one line.** Missing address, how to book or room block, check-in, and how it relates to the venue (is there transport?). Don't invent these; ask the family.
- **Naming inconsistency.** The Invitation says "Nikkah Ceremony", the events list says "Wedding" (id `nikah`), and the RSVP says "Wedding". Pick one.
- **Duplicate wording.** The hero says "request the honour of your presence at the wedding of…" and the Invitation immediately below repeats the invitation text. Trim one.
- **No end times or flow** for Haldi, Wedding or Reception. "Dinner to follow" and "rukhsati" are mentioned in different places.

## P1 — accessibility

- The RSVP "Joyfully attending / Regretfully can't" options are `div role="button"`. Enter works, Space doesn't; there is no `aria-pressed` or radio semantics and no visible focus style. Use real radio inputs.
- Gold text (`#b8964f`, `--gold`) on cream is roughly 2.5–3:1 contrast, below AA for small text (hero "Together with their families", the `✦`, "with").
- The error message has no `aria-live`.
- Guest count is optional even when attending; a caterer will want it required (1–15).
- `.countdown` has an `aria-label` without a role.
- Positives: reduced motion is respected for the petals, form inputs have labels, and the hero card image has alt text.

## P2 — performance and code health

- **Plain `<img>` everywhere.** Use `next/image` (sizes, AVIF/WebP, width/height to prevent layout shift). `card-green.jpg` (491 KB) loads twice in the hero, once sharp and once as the blurred background.
- **`DesignHero.tsx`** is ~240 lines of inline styles with cqw/% magic numbers positioning text over a raster. Move to CSS classes. The text positions will break if the card art changes.
- **Dead CSS:** `.hero`, `.bismillah`, `.invitedTo`, `.guestName`, `.coupleNames`, `.amp`, `.heroDate`, `.heroCity`, `.check`, `.checkRow`, `.fadeUp`, `.d1`–`.d4`.
- **Unused asset:** `public/venue/british_kothi.avif`.
- **`Invitation.tsx`** hardcodes family names (the README promises config-only editing), and `events.find(...)!` crashes if the `nikah` event is removed. The footer credit is also hardcoded.
- **`useSearchParams`** forces the whole page client-side with an empty `<Suspense>`, causing a blank flash and no server-rendered content for previews. Reading `searchParams` in the server page avoids this.
- The metadata description hardcodes "December 2026".

## What's working

Config-driven content, per-guest links, event filtering that carries into the RSVP, the hero artwork, the favicon set, the mobile-first single column, dress-code tags, and reduced-motion handling.
