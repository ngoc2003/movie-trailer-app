import React from "react";
import { Link } from "react-router-dom";

const Button = ({ onClick, className, children, fluid, outline=false, to = "" }) => {
  const btn = (
    <button
      onClick={onClick}
      className={`${outline ? "bg-transparent text-primary border border-primary" : "bg-primary text-white"} duration-100 py-3 px-6 rounded-lg capitalize  gap-1  flex items-center justify-center hover:opacity-90 ${className} ${
        fluid ? "w-full" : "w-auto"
      }`}
    >
      {children}
    </button>
  );
  return !to ? btn : <Link to={to}>{btn}</Link>;
};

export default Button;
