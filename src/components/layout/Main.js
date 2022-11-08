import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import useMediaQuery from "../../hooks/useMediaQuery";
import Copyright from "../Copyright";

const Main = () => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef();
  const isDesktop = useMediaQuery("(min-width:950px)");
  const location = useLocation();
  useEffect(() => {
    setShowNav(false);
  }, [location]);
  useEffect(() => {
    if (isDesktop) {
      setShowNav(true);
    } else {
      setShowNav(false);
      function handleClickOut(e) {
        if (e.target.nodeName !== "svg" && !navRef.current.contains(e.target)) {
          setShowNav(false);
        }
      }
      document.addEventListener("click", handleClickOut);
      return () => {
        document.removeEventListener("click", handleClickOut);
      };
    }
  }, [isDesktop]);
  return (
    <div className="relative flex h-screen overflow-hidden">
      <SideBar showNav={showNav} ref={navRef}></SideBar>
      <div className="flex-1 overflow-y-scroll main">
        <Header setShowNav={setShowNav}></Header>
        <Outlet></Outlet>
        <Copyright></Copyright>
      </div>
    </div>
  );
};

export default Main;
