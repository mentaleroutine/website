import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Mental Routine for Golfers",
  description: "Discover your mental routine as a golfer. Play better and enjoy the game more.",
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
