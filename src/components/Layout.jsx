import React from "react";
import Header from "./Header";

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="pt-[80px]">
      <div className="flex">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  </>
);

export default Layout;