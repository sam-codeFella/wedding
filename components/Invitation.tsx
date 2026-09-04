import { events } from "@/lib/config";

/**
 * Formal Nikkah invitation wording — groom's side. Structure and
 * phrasing follow the Rizvi family's own card (parents as the
 * requesting party, grandparents credited in a parenthetical line),
 * not the bride's-side card in the design file.
 */
export default function Invitation() {
  const nikah = events.find((e) => e.id === "nikah")!;

  return (
    <section className="section invitationSection">
      <div className="invitationCard">
        <img src="/hero/bismillah.png" alt="Bismillah" className="invitationBismillah" />
        <p className="invitationIntro">
          In the name of Allah, the most beneficent, the most merciful
          <br />
          Najmul Hasan Rizvi &amp; Rubeena Rizvi
          <br />
          request the pleasure of your company at the
        </p>
        <p className="invitationTitle">Nikkah Ceremony</p>
        <p className="invitationRelation">of their son</p>

        <p className="invitationName">Shams Hasan Rizvi</p>
        <p className="invitationParents">(Grandson of Late Shariful Hussain &amp; Zahoor Fatima)</p>

        <p className="invitationWith">with</p>

        <p className="invitationName">Sayyeda Sania Zahra Zaidi</p>
        <p className="invitationParents">D/O Syed Tanveer Zaidi &amp; Ruby Naz Zaidi</p>

        <p className="invitationMeta">
          Insha Allah on {nikah.date} | {nikah.time.replace(" onwards", "")}
          <br />
          Followed by dinner &amp; rukhsati
          <br />
          Venue – {nikah.venue}
        </p>
      </div>
    </section>
  );
}
