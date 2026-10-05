"use client";

import { useSearchParams } from "next/navigation";
import { contact, couple, events, rsvpBy, stay } from "@/lib/config";
import Rsvp from "./Rsvp";
import DesignHero from "./DesignHero";
import Invitation from "./Invitation";
import { CalendarIcon, PinIcon, StayIcon, eventIcons } from "./Icons";

const pad = (n: number) => String(n).padStart(2, "0");
function calendarUrl(name: string, start: string, venue: string) {
  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const from = new Date(start);
  const to = new Date(from.getTime() + 3 * 3600 * 1000); // assumed 3h; end times are not announced
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${name} — ${couple.groom} & ${couple.bride}`,
    dates: `${fmt(from)}/${fmt(to)}`,
    location: venue,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

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
  const sharedMap = shownEvents.every((e) => e.mapUrl === shownEvents[0].mapUrl)
    ? shownEvents[0]
    : null;

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
          {shownEvents.map((e) => {
            const Icon = eventIcons[e.icon];
            return (
              <article key={e.id} className="eventCard">
                {e.images?.length ? (
                  <div className={`eventPhotos${e.images.length > 1 ? " multi" : ""}`}>
                    {e.images.map((src) => (
                      <img key={src} src={src} alt={`${e.name} venue`} loading="lazy" />
                    ))}
                  </div>
                ) : null}
                <div className="eventBody">
                  <Icon className="eventIcon" />
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
                    <div className="eventLinks">
                      <a
                        className="mapLink"
                        href={calendarUrl(e.name, e.start, e.venue)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CalendarIcon className="linkIcon" /> Add to calendar
                      </a>
                      {sharedMap ? null : (
                        <a className="mapLink" href={e.mapUrl} target="_blank" rel="noopener noreferrer">
                          <PinIcon className="linkIcon" /> Open in Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {sharedMap ? (
          <p className="venueLine">
            All celebrations are at {sharedMap.venue}.{" "}
            <a className="mapLink" href={sharedMap.mapUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon className="linkIcon" /> Open in Maps
            </a>
          </p>
        ) : null}
      </section>

      {/* ---------- Stay ---------- */}
      <section className="section">
        <h2 className="sectionTitle">Where You&apos;ll Stay</h2>
        <div className="rule">✦</div>
        <article className="eventCard">
          <div className="eventPhotos">
            <img src={stay.image} alt={stay.name} loading="lazy" />
          </div>
          <div className="eventBody">
            <StayIcon className="eventIcon" />
            <div>
              <h3 className="eventName">{stay.name}</h3>
              <p className="eventMeta">{stay.blurb}</p>
              <a
                className="mapLink"
                href={stay.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PinIcon className="linkIcon" /> Open in Maps
              </a>
            </div>
          </div>
        </article>
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
        {contact.phone ? (
          <p className="contactLine">
            Questions? WhatsApp {contact.name ? `${contact.name} ` : ""}
            <a href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer">
              +{contact.phone}
            </a>
          </p>
        ) : null}
        <p className="designCredit">Design By Shireen Hasnain</p>
        {couple.hashtag ? <p className="hashtag">{couple.hashtag}</p> : null}
        <p>With love, {couple.groom} &amp; {couple.bride}</p>
      </footer>
    </main>
  );
}
