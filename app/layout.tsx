import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turya — a home for builders",
  description:
    "A collective for people who build, learn, play, and make things together.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
