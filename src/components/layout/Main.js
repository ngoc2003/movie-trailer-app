import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/SideBar";

const Main = () => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef();
  useEffect(() => {
    function handleClickOut(e) {
      if (e.target.nodeName !== 'svg' && !navRef.current.contains(e.target) ) {
        setShowNav(false);
      }
    }
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, []);
  return (
    <div className="flex h-screen overflow-hidden relative">
      <SideBar showNav={showNav} setShowNav={setShowNav} ref={navRef}></SideBar>
      <div className="flex-1 overflow-y-scroll">
        <Header setShowNav={setShowNav}></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
