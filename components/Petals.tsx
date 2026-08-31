"use client";

const PETALS = ["🌼", "🌸", "🌺", "🌼", "✨", "🌸", "🌼", "✨"];

/** Gently falling marigold petals over the hero. Pure CSS animation. */
export default function Petals() {
  return (
    <div aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 13 + 5) % 95}%`,
            animationDuration: `${9 + (i % 4) * 2.5}s`,
            animationDelay: `${i * 1.4}s`,
            fontSize: `${0.85 + (i % 3) * 0.25}rem`,
          }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}
