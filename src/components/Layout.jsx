import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";

const Layout = () => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark" : ""}`}
    >
      <Navigation />
      <main className="md:pl-64 pb-24 md:pb-0 min-h-screen">
        <div className="container-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
