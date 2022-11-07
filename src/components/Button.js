import React from "react";
import { Link } from "react-router-dom";

const Button = ({ onClick, className, children, fluid, to = "" }) => {
  const btn = (
    <button
      onClick={onClick}
      className={`duration-100 py-3 px-6 rounded-lg capitalize bg-primary gap-1 text-white flex items-center justify-center hover:opacity-90 ${className} ${
        fluid ? "w-full" : "w-auto"
      }`}
    >
      {children}
    </button>
  );
  return !to ? btn : <Link to={to}>{btn}</Link>;
};

export default Button;
