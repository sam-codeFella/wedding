"use client";

import { useState } from "react";
import { events, googleForm } from "@/lib/config";

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
  const [selected, setSelected] = useState<string[]>(shownEvents.map((e) => e.id));
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const toggleEvent = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  async function submit() {
    setError("");
    if (!name.trim()) return setError("Please tell us your name 🙂");
    if (!attending) return setError("Please pick attending / not attending.");

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
      for (const id of selected) {
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
      setError("Something went wrong — please try again, or WhatsApp us directly.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rsvpCard thanks">
        <p className="thanksTitle">
          {attending === "yes" ? "Yay! Can't wait to celebrate with you 🎉" : "You'll be missed 🤍"}
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
          placeholder="e.g. Sharma Family"
        />
      </div>

      <div className="field">
        <span className="fieldLabel">Will you be joining us?</span>
        <div className="choiceRow">
          <div
            className={`choice ${attending === "yes" ? "selected" : ""}`}
            onClick={() => setAttending("yes")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setAttending("yes")}
          >
            Joyfully attending 🎊
          </div>
          <div
            className={`choice ${attending === "no" ? "selected" : ""}`}
            onClick={() => setAttending("no")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setAttending("no")}
          >
            Regretfully can&apos;t 😔
          </div>
        </div>
      </div>

      {attending === "yes" && (
        <>
          <div className="field">
            <label className="fieldLabel" htmlFor="rsvp-guests">Number of guests</label>
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

          <div className="field">
            <span className="fieldLabel">Which events?</span>
            <div className="checkRow">
              {shownEvents.map((e) => (
                <div
                  key={e.id}
                  className={`check ${selected.includes(e.id) ? "selected" : ""}`}
                  onClick={() => toggleEvent(e.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(ev) => ev.key === "Enter" && toggleEvent(e.id)}
                >
                  {e.emoji} {e.name}
                </div>
              ))}
            </div>
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

      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
