import React from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import { FaBars } from "react-icons/fa";

const Header = ({ setShowNav }) => {
  const hideBars = useMediaQuery("(max-width: 950px)");
  return (
    <header className="header flex items-center text-white py-8 page-container relative">
      <span className="absolute" onClick={() => setShowNav(true)}>
        {hideBars ? (
          <FaBars size={46} style={{ padding: "10px" }}></FaBars>
        ) : (
          ""
        )}
      </span>

      <div className="flex items-center text-white gap-x-5 mx-auto md:mx-0">
        <NavLink
          to="/tv"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          TV Series
        </NavLink>
        <NavLink
          to="/movie"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Movies
        </NavLink>
        {/* <NavLink
        to="/anime"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Anime
      </NavLink> */}
      </div>
    </header>
  );
};

export default Header;
