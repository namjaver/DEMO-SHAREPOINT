import React from "react";
import Header from "./Header";
import Mega from "./MegaMenu";

const Layout = ({ children }) => {
  const [isSwap, setIsSwap] = React.useState(false);
  return (
  <>
    {/* {isSwap ? <Header onToggleSwap={() => setIsSwap(!isSwap)} /> : <Mega onToggleSwap={() => setIsSwap(!isSwap)} />} */}
    <Header />
    <div className="pt-[80px]">
      <div className="flex">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  </>
  )
};

export default Layout;