import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-4 mx-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/meals">Recipes By Meal</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
