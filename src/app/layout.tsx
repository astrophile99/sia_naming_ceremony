import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sia's Naming Ceremony 🌸 | A Celebration of Life & Love",
  description:
    "Join us in celebrating the beautiful naming ceremony of our precious baby girl, Sia. A magical collection of memories, moments, and milestones.",
  keywords: ["Sia naming ceremony", "baby naming ceremony", "baby girl", "celebration", "photos", "memories"],
  openGraph: {
    title: "Sia's Naming Ceremony 🌸",
    description: "A magical collection of memories from Sia's beautiful naming ceremony.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sia's Naming Ceremony 🌸",
    description: "A magical collection of memories from Sia's beautiful naming ceremony.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Dancing+Script:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#fce4ec" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
