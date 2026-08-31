import type { Metadata } from "next";
import { couple, city } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${couple.groom} & ${couple.bride} — Wedding Invitation`,
  description: `You are warmly invited to the wedding of ${couple.groom} & ${couple.bride}, December 2026, ${city}.`,
  openGraph: {
    title: `${couple.groom} & ${couple.bride} — Wedding Invitation`,
    description: `Join us in ${city} this December. Tap to see the schedule and RSVP.`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
