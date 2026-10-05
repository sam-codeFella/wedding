import type { Metadata, Viewport } from "next";
import { couple, city } from "@/lib/config";
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL to the live domain so share-preview image URLs are absolute.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const viewport: Viewport = { themeColor: "#0d3833" };

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  robots: { index: false, follow: false },
  title: `${couple.groom} & ${couple.bride} — Wedding Invitation`,
  description: `You are warmly invited to the wedding of ${couple.groom} & ${couple.bride}, December 2026, ${city}.`,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: `${couple.groom} & ${couple.bride} — Wedding Invitation`,
    description: `Join us in ${city} this December. Tap to see the schedule and RSVP.`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${couple.groom} & ${couple.bride}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
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
