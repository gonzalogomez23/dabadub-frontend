import type { Metadata } from "next";
import { Inter, Sorts_Mill_Goudy, Outfit } from "next/font/google";
import "./globals.css";


const interFont = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

const outfitFont = Outfit({
  variable: "--font-outfit",
  weight: "400",
  subsets: ["latin"],
})

const sortsMillGoudyFont = Sorts_Mill_Goudy({
  variable: "--font-sorts-mill-goudy",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Dabadub",
  description: "Essential guide for Spanish speakers moving to Dublin. Discover practical tips, housing advice, job hunting, and paperwork guides to start your life in Ireland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${outfitFont.variable} ${sortsMillGoudyFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
