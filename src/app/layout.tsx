import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/session-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const stickysugary = localFont({
  src: "./fonts/StickySugary.ttf",
  variable: "--font-stickysugary",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FriendSix",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${stickysugary.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
