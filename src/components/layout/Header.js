import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex items-center text-white gap-x-5 py-8 page-container">
      <NavLink
        to="/tv"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        TV Series
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
      {/* <NavLink
        to="/anime"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Anime
      </NavLink> */}
    </header>
  );
};

export default Header;
