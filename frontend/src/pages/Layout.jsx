import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;