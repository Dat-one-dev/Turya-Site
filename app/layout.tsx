import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turya — an ecosystem for young builders",
  description:
    "An ecosystem for young builders who learn, create, and ship things together.",
};

export const viewport: Viewport = {
  themeColor: "#060606",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="starfield" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
