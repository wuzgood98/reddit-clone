import React from "react";
import { Open_Sans } from "next/font/google";
import Navbar from "../Navbar/Navbar";

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
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
