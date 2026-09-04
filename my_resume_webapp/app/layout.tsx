import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rauan Tuken | Junior Full Stack Developer",
  description:
    "Portfolio and CV website of Rauan Tuken, Junior Full Stack Developer and IT student of KBTU.",
  openGraph: {
    title: "Rauan Tuken | Junior Full Stack Developer",
    description: 
      "Mobile, frontend, and full stack development portfolio by Rauan Tuken.",
    type: "website",  
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
