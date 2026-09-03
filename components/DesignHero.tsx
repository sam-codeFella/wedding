import { couple } from "@/lib/config";

/**
 * Ported 1:1 from the "Hero" screen in Claude Design
 * (Website design setup/Shams & Sania Wedding.dc.html).
 * Sits above the existing hero for now — kept separate until
 * the rest of that design is folded in.
 */
export default function DesignHero() {
  return (
    <section
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #16514a 0%, #0d3833 60%, #092a26 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src="/hero/card-green.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: "-4%",
          width: "108%",
          height: "108%",
          objectFit: "cover",
          filter: "blur(18px) brightness(0.72)",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "min(100vw, max(440px, calc(100vh * 1016 / 1865)))",
          aspectRatio: "1016/1865",
          containerType: "inline-size",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src="/hero/card-green.jpg"
          alt={`${couple.bride} and ${couple.groom} wedding card`}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            left: "28%",
            right: "28%",
            top: "27%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2cqw",
            textAlign: "center",
          }}
        >
          <img src="/hero/bismillah.png" alt="Bismillah" style={{ width: "20cqw" }} />
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "max(10px, 1.9cqw)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#b8964f",
              marginTop: "1cqw",
            }}
          >
            Together with their families
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "max(13px, 2.7cqw)",
              lineHeight: 1.3,
              color: "#3d4a46",
              letterSpacing: "0.02em",
            }}
          >
            request the honour of your presence at the wedding of
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "28%",
            right: "28%",
            top: "57%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "11cqw",
              lineHeight: 1,
              color: "#0f3d38",
              letterSpacing: "0.02em",
            }}
          >
            {couple.bride}
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "5cqw",
              lineHeight: 1.2,
              color: "#b8964f",
            }}
          >
            &amp;
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "11cqw",
              lineHeight: 1,
              color: "#0f3d38",
              letterSpacing: "0.02em",
            }}
          >
            {couple.groom}
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "max(12px, 2.4cqw)",
              letterSpacing: "0.3em",
              color: "#0f3d38",
              marginTop: "1.8cqw",
            }}
          >
            19 · 12 · 2026
          </div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "max(11px, 2cqw)",
              letterSpacing: "0.04em",
              color: "#5a655f",
              marginTop: "0.4cqw",
            }}
          >
            Prayagraj, Uttar Pradesh
          </div>
        </div>
      </div>
    </section>
  );
}
