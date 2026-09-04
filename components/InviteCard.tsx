"use client";

import { useSearchParams } from "next/navigation";
import { couple, events, rsvpBy } from "@/lib/config";
import Rsvp from "./Rsvp";
import DesignHero from "./DesignHero";
import Invitation from "./Invitation";

/**
 * Personalisation via the URL — build links like:
 *   https://your-domain.com/?to=Sharma%20Family
 *   https://your-domain.com/?to=Rahul&guests=2
 *   https://your-domain.com/?to=Aunty%20Ji&events=haldi,nikah
 *
 * ?to=      guest / family name shown on the card and pre-filled in RSVP
 * ?guests=  pre-fills guest count in the RSVP form
 * ?events=  comma-separated event ids — only those events are shown
 */
export default function InviteCard() {
  const params = useSearchParams();

  const guestName = params.get("to") ?? "";
  const guestCount = params.get("guests") ?? "";
  const eventsParam = params.get("events");

  const invitedIds = eventsParam
    ? eventsParam.split(",").map((s) => s.trim().toLowerCase())
    : null;

  const visibleEvents = invitedIds
    ? events.filter((e) => invitedIds.includes(e.id))
    : events;
  const shownEvents = visibleEvents.length > 0 ? visibleEvents : events;

  return (
    <main>
      {/* ---------- Hero (card + live countdown) ---------- */}
      <DesignHero guestName={guestName} />

      {/* ---------- Invitation ---------- */}
      <Invitation />

      {/* ---------- Schedule ---------- */}
      <section className="section">
        <h2 className="sectionTitle">Celebrations</h2>
        <div className="rule">✦</div>
        <div className="eventGrid">
          {shownEvents.map((e) => (
            <article key={e.id} className="eventCard">
              <div className="eventEmoji">{e.emoji}</div>
              <div>
                <h3 className="eventName">{e.name}</h3>
                <p className="eventMeta">
                  {e.date} · {e.time}
                  <br />
                  {e.venue}
                  {e.note ? <em> — {e.note}</em> : null}
                </p>
                {e.dress ? (
                  <div className="eventTags">
                    <span className="tag">Dress: {e.dress}</span>
                  </div>
                ) : null}
                <a
                  className="mapLink"
                  href={e.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Open in Maps
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- RSVP ---------- */}
      <section className="section" id="rsvp">
        <h2 className="sectionTitle">RSVP</h2>
        <div className="rule">✦</div>
        <Rsvp
          defaultName={guestName}
          defaultGuests={guestCount}
          invitedEventIds={invitedIds}
          rsvpBy={rsvpBy}
        />
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <p className="designCredit">Design By Shireen Hasnain</p>
        {couple.hashtag ? <p className="hashtag">{couple.hashtag}</p> : null}
        <p>With love, {couple.groom} &amp; {couple.bride}</p>
      </footer>
    </main>
  );
}
