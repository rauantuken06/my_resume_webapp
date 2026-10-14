import type { Metadata } from "next";
import "./globals.css";

/**
 * Absolute base for Open Graph URLs. Crawlers reject relative image paths, so
 * without this the share preview falls back to plain text with no image.
 * Override with NEXT_PUBLIC_SITE_URL once the site has its own domain.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rauan-tuken-cv.onrender.com";

const title = "Rauan Tuken | Junior Full Stack Developer";
const description =
  "Portfolio and CV website of Rauan Tuken, Junior Full Stack Developer and IT student of KBTU.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: "Rauan Tuken",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rauan Tuken, Junior Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>  
  );
}
