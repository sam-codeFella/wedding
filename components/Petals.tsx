"use client";

const LEAVES = [0, 1, 2, 3, 4, 5, 6, 7];

/** Gently falling gold/green leaves over the hero. Pure CSS animation. */
export default function Petals() {
  return (
    <div aria-hidden="true">
      {LEAVES.map((i) => (
        <svg
          key={i}
          className="petal"
          viewBox="0 0 24 24"
          style={{
            left: `${(i * 13 + 5) % 95}%`,
            animationDuration: `${11 + (i % 4) * 2.5}s`,
            animationDelay: `${i * 1.6}s`,
            width: `${16 + (i % 3) * 7}px`,
            height: `${16 + (i % 3) * 7}px`,
          }}
        >
          <path
            d="M4 20C4 9 11 3 21 3c0 10-6 17-17 17Z"
            fill={i % 3 === 0 ? "#d4b876" : "#2f7a6c"}
            fillOpacity="0.85"
          />
          <path d="M4 20 15 9" stroke="#0d3833" strokeOpacity="0.5" strokeWidth="1" fill="none" />
        </svg>
      ))}
    </div>
  );
}
