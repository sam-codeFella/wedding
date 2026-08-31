"use client";

import { useEffect, useState } from "react";
import { weddingDate } from "@/lib/config";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(): Parts {
  const ms = Math.max(0, weddingDate.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export default function Countdown() {
  // null until mounted — avoids a server/client hydration mismatch
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const boxes: Array<[keyof Parts, string]> = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["mins", "Minutes"],
    ["secs", "Seconds"],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {boxes.map(([key, label]) => (
        <div key={key} className="countBox">
          <div className="countNum">{t ? t[key] : "–"}</div>
          <div className="countLabel">{label}</div>
        </div>
      ))}
    </div>
  );
}
