"use client";

import { useState } from "react";
import { contact, events, googleForm } from "@/lib/config";

type Props = {
  defaultName: string;
  defaultGuests: string;
  invitedEventIds: string[] | null; // null = invited to everything
  rsvpBy: string;
};

/**
 * Custom-styled RSVP that submits straight to your Google Form's
 * backend (the /formResponse endpoint). Guests never see a Google
 * Form; responses land in your linked Google Sheet as usual.
 *
 * NOTE: the request is sent with mode "no-cors", so the browser can't
 * read Google's response. Submission is fire-and-forget — with correct
 * formId + entry IDs it reliably lands in the Sheet. Test once with
 * yourself before sending links out!
 */
export default function Rsvp({ defaultName, defaultGuests, invitedEventIds, rsvpBy }: Props) {
  const shown = invitedEventIds
    ? events.filter((e) => invitedEventIds.includes(e.id))
    : events;
  const shownEvents = shown.length > 0 ? shown : events;

  const [name, setName] = useState(defaultName);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(defaultGuests);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    if (!name.trim()) return setError("Please tell us your name 🙂");
    if (!attending) return setError("Please pick attending / not attending.");
    const n = Number(guests);
    if (attending === "yes" && !(Number.isInteger(n) && n >= 1 && n <= 15))
      return setError("Please enter how many guests are coming (1–15).");

    if (googleForm.formId.startsWith("PASTE_")) {
      return setError(
        "Google Form not wired up yet — set formId + entry IDs in lib/config.ts."
      );
    }

    const body = new URLSearchParams();
    body.append(googleForm.fields.name, name.trim());
    body.append(
      googleForm.fields.attending,
      attending === "yes" ? googleForm.attendingOptions.yes : googleForm.attendingOptions.no
    );
    if (guests.trim()) body.append(googleForm.fields.guestCount, guests.trim());
    if (attending === "yes") {
      for (const { id } of shownEvents) {
        const label = googleForm.eventLabels[id];
        if (label) body.append(googleForm.fields.events, label);
      }
    }
    if (message.trim()) body.append(googleForm.fields.message, message.trim());

    setBusy(true);
    try {
      await fetch(
        `https://docs.google.com/forms/d/e/${googleForm.formId}/formResponse`,
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        }
      );
      setDone(true);
    } catch {
      setError(
        contact.phone
          ? "Something went wrong — please try again, or WhatsApp us directly."
          : "Something went wrong — please try again in a moment."
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rsvpCard thanks">
        <p className="thanksTitle">
          {attending === "yes" ? "Can't wait to celebrate with you!" : "You'll be missed"}
        </p>
        <p>
          {attending === "yes"
            ? "Your RSVP is in. See you in December!"
            : "Thank you for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <div className="rsvpCard">
      <p className="rsvpNote">Kindly respond by {rsvpBy}</p>

      <div className="field">
        <label className="fieldLabel" htmlFor="rsvp-name">Your name / family</label>
        <input
          id="rsvp-name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please enter your family name"
        />
      </div>

      <div className="field">
        <span className="fieldLabel">Will you be joining us?</span>
        <div className="choiceRow" role="radiogroup" aria-label="Will you be joining us?">
          <label className={`choice ${attending === "yes" ? "selected" : ""}`}>
            <input
              type="radio"
              name="attending"
              className="srOnly"
              checked={attending === "yes"}
              onChange={() => setAttending("yes")}
            />
            Joyfully attending
          </label>
          <label className={`choice ${attending === "no" ? "selected" : ""}`}>
            <input
              type="radio"
              name="attending"
              className="srOnly"
              checked={attending === "no"}
              onChange={() => setAttending("no")}
            />
            Regretfully can&apos;t make it
          </label>
        </div>
      </div>

      {attending === "yes" && (
        <>
          <div className="field">
            <label className="fieldLabel" htmlFor="rsvp-guests">Number of guests (including you)</label>
            <input
              id="rsvp-guests"
              className="input"
              type="number"
              min={1}
              max={15}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="e.g. 3"
            />
          </div>
        </>
      )}

      <div className="field">
        <label className="fieldLabel" htmlFor="rsvp-msg">A message for the couple (optional)</label>
        <textarea
          id="rsvp-msg"
          className="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Duas, blessings, shayari…"
        />
      </div>

      <button className="submitBtn" onClick={submit} disabled={busy}>
        {busy ? "Sending…" : "Send RSVP"}
      </button>

      {error ? <p className="error" role="alert">{error}</p> : null}
    </div>
  );
}
