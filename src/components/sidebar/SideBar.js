import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { sidebar } from "../../base/sidebar";
import useMediaQuery from "../../hooks/useMediaQuery";

const SideBar = React.forwardRef((props, ref) => {
  const { showNav } = props;
  return (
    <div
      ref={ref}
      className={`duration-500 w-[18%] max-w-[300px] min-w-[250px] h-full bg-[#181818] pt-8 px-4 overflow-auto absolute z-50 ${
        !showNav && "-right-[100%]"
      }`}
    >
      <h1 className=" text-3xl font-bold pb-3">
        <span className="text-primary">TL</span> Movie{" "}
      </h1>
      <div className="list-sidebar">
        {sidebar.map((group) => (
          <div className="pt-4" key={group.group}>
            <p className="text-sm opacity-25 pb-2 pl-1">{group.group}</p>
            <div className="flex flex-col pl-1 gap-3 ">
              {group.items.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    isActive ? "active sidebar-item" : "sidebar-item"
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PROFILE SETTING */}
      {/* <div className="pt-4">
        <p className="text-sm opacity-25 pb-2">General</p>
        <div className="flex flex-col pl-4 gap-3 ">
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive
                ? "text-primary flex gap-x-2 items-center"
                : "flex gap-x-2 items-center"
            }
          >
            <span className="text-xl">
              <AiFillSetting></AiFillSetting>
            </span>
            Setting
          </NavLink>
          <NavLink
            to="/log"
            className={({ isActive }) =>
              isActive
                ? "text-primary flex gap-x-2 items-center"
                : "flex gap-x-2 items-center"
            }
          >
            <span className="text-xl">
              <IoLogOut></IoLogOut>
            </span>
            Log out
          </NavLink>
        </div>
      </div> */}
    </div>
  );
});

export default SideBar;
