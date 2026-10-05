// ============================================================
// EDIT THIS FILE — everything about your wedding lives here.
// No other file needs touching for text/date/venue changes.
// ============================================================

export const couple = {
  groom: "Shams",
  bride: "Sania",
  hashtag: "#ShamsWedsSania", // shown in the footer; change or set to "" to hide
};

// Wedding day (main event) — used for the countdown.
// Pinned to IST so the countdown is right for guests in any timezone.
export const weddingDate = new Date("2026-12-19T19:00:00+05:30");

export const city = "Prayagraj (Allahabad), Uttar Pradesh";

// ------------------------------------------------------------
// EVENTS — add/remove/edit freely. `id` is used in invite links
// (?events=haldi,nikah) to show a guest only their events.
// mapUrl: paste the "Share > Copy link" URL from Google Maps.
// ------------------------------------------------------------
export type WeddingEvent = {
  id: string;
  name: string;
  icon: "haldi" | "ring" | "sparkle";
  start: string; // ISO with +05:30, used for add-to-calendar
  date: string; // display string
  time: string;
  venue: string;
  mapUrl: string;
  dress?: string;
  note?: string;
  images?: string[]; // paths under /public, shown at the top of the card
};

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    icon: "haldi",
    start: "2026-12-18T11:00:00+05:30",
    date: "Friday, 18 December 2026",
    time: "11:00 AM onwards",
    venue: "Welcomhotel by ITC Hotels, Prayagraj",
    mapUrl: "https://maps.app.goo.gl/9bFsyDX2ziGni1nU6",
    dress: "Yellow / floral",
    images: ["/venue/regal_hall.jpg"],
  },
  {
    id: "nikah",
    name: "Nikkah",
    icon: "ring",
    start: "2026-12-19T19:00:00+05:30",
    date: "Saturday, 19 December 2026",
    time: "7:00 PM onwards",
    venue: "Welcomhotel by ITC Hotels, Prayagraj",
    mapUrl: "https://maps.app.goo.gl/9bFsyDX2ziGni1nU6",
    dress: "Traditional",
    note: "Dinner to follow",
    images: ["/venue/overview-shot.jpeg"],
  },
  {
    id: "reception",
    name: "Reception",
    icon: "sparkle",
    start: "2026-12-20T19:00:00+05:30",
    date: "Sunday, 20 December 2026",
    time: "7:00 PM onwards",
    venue: "Welcomhotel by ITC Hotels, Prayagraj",
    mapUrl: "https://maps.app.goo.gl/9bFsyDX2ziGni1nU6",
    dress: "Suits & classic western",
    images: ["/venue/pool-dusk-shot.jpg"],
  },
];

// Who guests can reach with questions. Leave `phone` empty to hide it.
// phone: digits with country code, no "+" or spaces (e.g. "919876543210").
export const contact = {
  name: "Shams",
  phone: "918237307294",
};

// Where out-of-town guests are staying — shown above the RSVP.
export const stay = {
  name: "The British Kothi",
  blurb: "Our guests will be staying here.",
  image: "/venue/british_kothi.jpeg",
  mapUrl: "https://maps.app.goo.gl/Ca7LRruk2fD5XL3F9",
};

// ------------------------------------------------------------
// GOOGLE FORM WIRING (for the custom RSVP UI)
//
// 1. Create a Google Form with these questions (all "Short answer"
//    unless noted):
//      - Full name            (short answer)
//      - Attending?           (multiple choice: "Joyfully attending" /
//                              "Regretfully can't make it")
//      - Number of guests     (short answer)
//      - Events you'll attend (checkboxes: Haldi, Nikkah, Reception)
//      - Message for the couple (paragraph)
// 2. Click Send > link icon > copy the form link. The long ID between
//    /d/e/ and /viewform is your formId.
// 3. Run `npm run entries` and paste the form URL when prompted — it
//    prints every entry ID. Paste them below.
//    (Manual fallback: see README.md § "Finding entry IDs by hand".)
// ------------------------------------------------------------

export const googleForm = {
  formId: "1FAIpQLSdpeSdxy1QkETb3NWfBGkQclLsQQGoB4GRlIv_myhqqPT_gnA",
  fields: {
    name: "entry.2074495908",
    attending: "entry.2115993116",
    guestCount: "entry.26841489",
    events: "entry.822741249", // checkbox question — sent once per selected event
    message: "entry.983454350",
  },
  // Must EXACTLY match the option text in your Google Form:
  attendingOptions: {
    yes: "Joyfully attending",
    no: "Regretfully can't make it",
  },
  // Checkbox option labels in the form, keyed by event id above:
  eventLabels: {
    haldi: "Haldi",
    nikah: "Nikkah",
    reception: "Reception",
  } as Record<string, string>,
};

// RSVP-by date shown on the card
export const rsvpBy = "30 November 2026";
