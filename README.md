# Shams & Sania — Wedding E-Card 💍

A dynamic, personalized wedding invitation built with Next.js. Guests get a
link, see a card addressed to them with a live countdown and event schedule,
and RSVP right on the card — responses land silently in your Google Sheet
via Google Forms.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Everything editable (names, dates, venues, events, form wiring) lives in
**`lib/config.ts`** — you should rarely need to touch anything else.

## 1. Wire up the Google Form (RSVP backend)

1. Create a Google Form (forms.google.com) with these questions:
   - **Full name** — short answer
   - **Attending?** — multiple choice: `Joyfully attending` / `Regretfully can't make it`
   - **Number of guests** — short answer
   - **Events you'll attend** — checkboxes: `Haldi`, `Wedding`, `Reception`
   - **Message for the couple** — paragraph
   - Set every question to *not required* (the card does its own validation),
     and under Settings turn **off** "Limit to 1 response" (that forces sign-in).
2. In the Responses tab, click the Sheets icon to link a Google Sheet —
   that's where RSVPs will appear.
3. Get the entry IDs:

   ```bash
   npm run entries -- "https://docs.google.com/forms/d/e/YOUR_ID/viewform"
   ```

   It prints the `formId` and an `entry.XXXXXXXX` for each question.
   Paste them into `googleForm` in `lib/config.ts`. Choice/checkbox option
   text in config **must exactly match** the option text in the form.

4. **Test it**: run the site, submit an RSVP as yourself, and check the Sheet.
   (The POST uses `no-cors`, so the browser can't confirm delivery — the
   Sheet is the source of truth.)

### Finding entry IDs by hand (fallback)

Open your form → ⋮ → **Get pre-filled link** → fill in dummy answers →
**Get link**. The copied URL contains `entry.123456789=...` for every
question — those numbers are your entry IDs.

## 2. Personalized invite links

The card reads URL parameters:

| Param | Effect | Example |
|---|---|---|
| `to` | Greets the guest by name, pre-fills RSVP name | `?to=Sharma%20Family` |
| `guests` | Pre-fills guest count | `?guests=4` |
| `events` | Shows only those events (ids from config: `haldi,nikah,reception`) | `?events=nikah,reception` |

So a close-family link might be
`https://your-domain.com/?to=Khala%20Jaan&guests=5`
while a colleague gets
`https://your-domain.com/?to=Rohit&events=reception`.

Tip: keep a spreadsheet of guest → link, and generate links with a formula:
`="https://your-domain.com/?to="&ENCODEURL(A2)&"&events="&B2`

## 3. Deploy to Vercel + your domain

```bash
npm i -g vercel
vercel          # first deploy (accept defaults)
vercel --prod   # production deploy
```

Or push the repo to GitHub and click **Import** on vercel.com — every push
then auto-deploys.

**Custom domain:** Vercel project → Settings → Domains → add
`your-domain.com`. Then at your registrar either:
- point nameservers to Vercel (easiest, Vercel shows you which), or
- add the `A` record (`76.76.21.21`) and `CNAME` for `www` that Vercel displays.

HTTPS is automatic. Propagation can take a few minutes to a few hours.

## Customizing

- **Colors/fonts**: CSS variables at the top of `app/globals.css`
  (maroon & gold by default).
- **Events**: add/remove objects in `events` in `lib/config.ts`; give each a
  unique `id` and add a matching label in `googleForm.eventLabels`.
- **Map links**: Google Maps → your venue → Share → Copy link → paste into
  `mapUrl`.
- **Photos**: drop images in `public/` and add them to `InviteCard.tsx`
  with `next/image`.

## Structure

```
lib/config.ts               ← all wedding data + Google Form wiring
app/layout.tsx              ← fonts + metadata (link previews)
app/globals.css             ← theme, animations
components/InviteCard.tsx   ← page layout, personalization logic
components/Countdown.tsx    ← live countdown
components/Rsvp.tsx         ← custom RSVP → Google Form submission
components/Petals.tsx       ← falling petals animation
scripts/extract-entries.mjs ← prints your form's entry IDs
```
