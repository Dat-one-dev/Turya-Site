import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turya — an ecosystem for young builders",
  description:
    "An ecosystem for young builders who learn, create, and ship things together.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="starfield" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
