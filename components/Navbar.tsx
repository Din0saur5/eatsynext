"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";

const Navbar = ({ session }: { session: Promise<boolean> }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      setLoggedIn(await session);
    })();
  }, [session]);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      setLoggedIn(false);
      router.push("/login");
    }
  };
  const pathname = usePathname();
  let links: { href: string; label: string }[] = [];

  if (loggedIn) {
    links = [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/dashboard",
        label: "Dashboard",
      },
      {
        href: "/recipes",
        label: "Recipes",
      },
    ];
  } else {
    links = [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/login",
        label: "Login",
      },
      {
        href: "/recipes",
        label: "Recipes",
      },
    ];
  }
  return (
    <nav>
      <ul className="flex gap-4 mx-10">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href
                  ? "text-foreground/80 font-bold"
                  : "text-foreground/60"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
        {loggedIn ? (
          <li>
            <button onClick={signOut}>Sign Out</button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
