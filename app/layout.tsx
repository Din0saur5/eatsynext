import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

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

const checkSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ? true : false;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = checkSession();
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <header>
          <Navbar session={session} />
        </header>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <footer>Copyright © 2024 Eatsy</footer>
      </body>
    </html>
  );
}
