import React from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="h-screen bg-gradient-radial from-[#282828] via-[#1a1a1a] to-[#0a0a0a]">
      <Navbar />
      <div className="px-16">{children}</div>
    </main>
  );
};

export default Layout;
