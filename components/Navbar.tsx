"use client";
import { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeSwap from "./ThemeBtn";

const Navbar = ({ session }: { session: Promise<boolean> }) => {
  const { changeTheme } = useContext(ThemeContext); 
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const supabase = createClient();
  const [searchQuery,setSearchQuery] = useState('')

  // const safeChangeTheme = () => {
  //   if (changeTheme) {
  //     changeTheme();
  //   }
  // };


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
  //const pathname = usePathname();
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
      {
        href: "/settings",
        label: 'Settings',
      },
      {
        href: "/createNewRecipe",
        label:"Create New Recipe"
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
      {
        href: "/settings",
        label: 'Settings',
      }
    ];
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">Eatsy</Link>
      </div>
      <div className=" max-sm:hidden">
      <ThemeSwap handleOnClick={changeTheme}/> 
      </div>
      <div className="flex-none gap-6">
        <div className="form-control flex-row">
          <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto md:min-w-96 focus:w-8/12"  />
          <Link href={`/recipes/search/${searchQuery}`} className={`btn btn-ghost btn-circle ml-4 ${searchQuery!=''? 'visible': 'invisible'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <div title="Dropdown Navigation" tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
        
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
