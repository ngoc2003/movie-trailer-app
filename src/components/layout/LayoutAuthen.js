import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuthen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-5 py-8 bg-white xs:rounded-md xs:w-[80%] max-w-[600px] min-w-[320px] text-black w-full h-screen xs:h-auto flex items-center justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutAuthen;
