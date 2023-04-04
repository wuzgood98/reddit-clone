import React from "react";
import { Open_Sans } from "next/font/google";
import Navbar from "../Navbar/Navbar";
import Head from "next/head";

const open_sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={open_sans.className}>
      <Head>
        <title>Reddit</title>
        <meta name="description" content="A clone of the reddit web app." />
        <meta name="author" content="Gideon Addo" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="NextJS, JavaScript, TypeScript, React, Tailwindcss, Firebase, Authentication, SSR, RSC"
        />
        <meta name="theme-color" content="#FFF" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
