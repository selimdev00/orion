import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  display: "swap",
  variable: "--font-geist",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orion.selim.services"),
  title: {
    default: "Orion - SpaceX Launch Record",
    template: "%s · Orion",
  },
  description:
    "An editorial archive of every SpaceX launch: missions, rockets, outcomes and imagery. Built with Next.js App Router.",
  openGraph: {
    title: "Orion - SpaceX Launch Record",
    description: "An editorial archive of every SpaceX launch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
