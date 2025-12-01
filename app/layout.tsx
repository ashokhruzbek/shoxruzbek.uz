import "./globals.css";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0E1016",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shoxruzbek.uz"),
  title: {
    default: "Shoxruzbek Abduraxmonov — Full Stack Developer",
    template: "%s | Shoxruzbek Abduraxmonov",
  },
  description:
    "Full Stack Developer from Uzbekistan. I build modern, responsive websites and web applications using React, Next.js, Node.js and more. Available for freelance work.",
  generator: "Next.js",
  applicationName: "Shoxruzbek Abduraxmonov Portfolio",
  authors: [{ name: "Shoxruzbek Abduraxmonov", url: "https://www.shoxruzbek.uz" }],
  creator: "Shoxruzbek Abduraxmonov",
  publisher: "Shoxruzbek Abduraxmonov",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  keywords: [
    "Shoxruzbek Abduraxmonov",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer Uzbekistan",
    "Freelance Developer",
    "UI/UX Designer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio",
    "Khorezm",
    "Uzbekistan",
    "Software Engineer",
    "Web Application Developer",
    "shoxruzbek.uz",
  ],
  openGraph: {
    title: "Shoxruzbek Abduraxmonov — Full Stack Developer",
    description:
      "Full Stack Developer from Uzbekistan. I build modern, responsive websites and web applications. Available for freelance work and collaborations.",
    url: "https://www.shoxruzbek.uz/",
    siteName: "Shoxruzbek Abduraxmonov",
    images: [
      {
        url: "/meta-logo.png",
        width: 1200,
        height: 630,
        alt: "Shoxruzbek Abduraxmonov — Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoxruzbek Abduraxmonov — Full Stack Developer",
    description:
      "Full Stack Developer from Uzbekistan. Building modern web applications with React, Next.js & Node.js.",
    creator: "@ashakhruzbek",
    site: "@ashakhruzbek",
    images: [
      {
        url: "/meta-logo.png",
        width: 1200,
        height: 630,
        alt: "Shoxruzbek Abduraxmonov Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.shoxruzbek.uz",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shoxruzbek Abduraxmonov",
  url: "https://www.shoxruzbek.uz",
  image: "https://www.shoxruzbek.uz/main-logo.png",
  sameAs: [
    "https://github.com/ashokhruzbek",
    "https://linkedin.com/in/shokhruzbek",
    "https://t.me/ashokhruzbek",
    "https://instagram.com/a.shokhruzbek",
  ],
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Khorezm",
    addressCountry: "Uzbekistan",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Frontend Development",
    "Backend Development",
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
