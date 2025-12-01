import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shoxruzbek Abduraxmonov — Full Stack Developer",
    short_name: "Shoxruzbek",
    description:
      "Full Stack Developer from Uzbekistan. Building modern web applications with React, Next.js & Node.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1016",
    theme_color: "#0E1016",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
