import type { Metadata } from "next";
import { interFont, outfitFont, sortsMillGoudyFont } from "@/lib/fonts";
import "./globals.css";
import { getNotification } from "@/lib/getNotification";
import NotificationBanner from "./components/NotificationBanner";

export const metadata: Metadata = {
  title: "Dabadub",
  description: "Essential guide for Spanish speakers moving to Dublin. Discover practical tips, housing advice, job hunting, and paperwork guides to start your life in Ireland.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notification = await getNotification();
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${outfitFont.variable} ${sortsMillGoudyFont.variable} antialiased bg-zinc-50 min-h-screen flex flex-col justify-start items-stretch`}
      >
        {children}
        {notification && (
          <NotificationBanner
            message={notification.message}
            type={notification.type}
          />
        )}
      </body>
    </html>
  );
}
