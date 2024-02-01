import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Eatsy",
    template: "%s | Eatsy",
  },
  description: "A recipe app that doesn't try to tell you its life story.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <header>
          <Navbar />
        </header>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <footer>Copyright © 2024 Eatsy</footer>
      </body>
    </html>
  );
}
