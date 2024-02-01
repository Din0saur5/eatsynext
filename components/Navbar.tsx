"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const links = [
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
      </ul>
    </nav>
  );
};

export default Navbar;
