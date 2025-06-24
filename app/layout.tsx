import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Shoxruzbek Abduraxmonov — Frontend Engineer",
  description:
    "Full Stack Developer, currently at Uzbekistan. Focused on interfaces and experiences, working remotely from Khorezm, Uzbekistan.",
  generator: "Next.js",
  applicationName: "Shoxruzbek Abduraxmonov",
  keywords: [
    "freelance",
    "developer",
    "freelance developer",
    "frontend",
    "react",
    "frontend developer",
    "frontend engineer",
    "creative",
    "creative developer",
    "creative engineer",
    "tech",
    "nigeria",
    "software",
    "software developer",
    "portfolio",
    "frontend developer portfolio",
    "creative developer portfolio",
  ],
  colorScheme: "dark",
  openGraph: {
    title: "Shoxruzbek Abduraxmonov — Full Stack Developer",
    description:
      "Full Stack Developer, currently at Uzbekistan. Focused on interfaces and experiences, working remotely from Khorezm, Uzbekistan.",
    url: "https://www.shoxruzbek.uz/",
    siteName: "www.shoxruzbek.uz",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Shoxruzbek Abduraxmonov — Full Stack Developer",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoxruzbek Abduraxmonov — Full Stack Developer",
    description:
      "Full Stack Developer, currently at Uzbekistan. Focused on interfaces and experiences, working remotely from Khorezm, Uzbekistan.",
    creator: "ashakhruzbek",
    creatorId: "1243720976552144897",
    images: [
      "#",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
