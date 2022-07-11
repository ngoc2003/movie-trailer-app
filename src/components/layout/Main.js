import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/SideBar";

const Main = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar></SideBar>
      <div className="flex-1 overflow-y-scroll">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
