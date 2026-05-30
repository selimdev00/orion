import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orion.example"),
  title: {
    default: "Orion — Space Launches Explorer",
    template: "%s · Orion",
  },
  description:
    "Browse, search and filter every SpaceX launch — patches, mission details, rockets and webcasts. Built with Next.js 14.",
  openGraph: {
    title: "Orion — Space Launches Explorer",
    description: "Browse, search and filter every SpaceX launch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
