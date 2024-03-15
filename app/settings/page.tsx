// app/settings/page.tsx
"use client";

import React, { useContext } from "react";
import Head from "next/head";
import ThemeSwap from "@/components/ThemeBtn";
import { ThemeContext } from "@/app/context/ThemeContext";

const SettingsPage = () => {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <div>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Customize your experience on our site, such as theme change!" />
      </Head>
      <h1>Settings</h1>
      <ThemeSwap handleOnClick={changeTheme}/> 
    </div>
  );
};

export default SettingsPage;
