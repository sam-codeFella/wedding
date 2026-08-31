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
// Format: year, monthIndex (0 = Jan, 11 = Dec), day, hour, minute
export const weddingDate = new Date(2026, 11, 19, 19, 0, 0);

export const city = "Prayagraj (Allahabad), Uttar Pradesh";

// ------------------------------------------------------------
// EVENTS — add/remove/edit freely. `id` is used in invite links
// (?events=haldi,sangeet) to show a guest only their events.
// mapUrl: paste the "Share > Copy link" URL from Google Maps.
// ------------------------------------------------------------
export type WeddingEvent = {
  id: string;
  name: string;
  emoji: string;
  date: string; // display string
  time: string;
  venue: string;
  mapUrl: string;
  dress?: string;
  note?: string;
};

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    emoji: "🌼",
    date: "Thursday, 17 December 2026",
    time: "11:00 AM onwards",
    venue: "Residence, Allahabad (TBD)",
    mapUrl: "https://maps.google.com/?q=Allahabad",
    dress: "Yellow / floral",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    emoji: "🍃",
    date: "Thursday, 17 December 2026",
    time: "4:00 PM onwards",
    venue: "Residence, Allahabad (TBD)",
    mapUrl: "https://maps.google.com/?q=Allahabad",
    dress: "Green / pastels",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    emoji: "🎶",
    date: "Friday, 18 December 2026",
    time: "7:00 PM onwards",
    venue: "Venue TBD, Allahabad",
    mapUrl: "https://maps.google.com/?q=Allahabad",
    dress: "Festive / sparkle",
  },
  {
    id: "nikah",
    name: "Wedding",
    emoji: "💍",
    date: "Saturday, 19 December 2026",
    time: "7:00 PM onwards",
    venue: "Venue TBD, Allahabad",
    mapUrl: "https://maps.google.com/?q=Allahabad",
    dress: "Traditional",
    note: "Dinner to follow",
  },
  {
    id: "reception",
    name: "Reception",
    emoji: "✨",
    date: "Sunday, 20 December 2026",
    time: "7:00 PM onwards",
    venue: "Venue TBD, Allahabad",
    mapUrl: "https://maps.google.com/?q=Allahabad",
  },
];

// ------------------------------------------------------------
// GOOGLE FORM WIRING (for the custom RSVP UI)
//
// 1. Create a Google Form with these questions (all "Short answer"
//    unless noted):
//      - Full name            (short answer)
//      - Attending?           (multiple choice: "Joyfully attending" /
//                              "Regretfully can't make it")
//      - Number of guests     (short answer)
//      - Events you'll attend (checkboxes: Haldi, Mehendi, Sangeet,
//                              Wedding, Reception)
//      - Message for the couple (paragraph)
// 2. Click Send > link icon > copy the form link. The long ID between
//    /d/e/ and /viewform is your formId.
// 3. Run `npm run entries` and paste the form URL when prompted — it
//    prints every entry ID. Paste them below.
//    (Manual fallback: see README.md § "Finding entry IDs by hand".)
// ------------------------------------------------------------

export const googleForm = {
  // e.g. "1FAIpQLSf...long-id..."
  formId: "PASTE_YOUR_FORM_ID_HERE",
  fields: {
    name: "entry.1111111111",
    attending: "entry.2222222222",
    guestCount: "entry.3333333333",
    events: "entry.4444444444", // checkbox question — sent once per selected event
    message: "entry.5555555555",
  },
  // Must EXACTLY match the option text in your Google Form:
  attendingOptions: {
    yes: "Joyfully attending",
    no: "Regretfully can't make it",
  },
  // Checkbox option labels in the form, keyed by event id above:
  eventLabels: {
    haldi: "Haldi",
    mehendi: "Mehendi",
    sangeet: "Sangeet",
    nikah: "Wedding",
    reception: "Reception",
  } as Record<string, string>,
};

// RSVP-by date shown on the card
export const rsvpBy = "30 November 2026";
