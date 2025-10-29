import React from "react";
import Header from "./Header";

const Layout = ({ children }) => (
  <div>
    <div className="flex">
      <main className="flex-1">{children}</main>
    </div>
  </div>
);

export default Layout;