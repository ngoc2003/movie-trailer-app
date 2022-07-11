import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { sidebar } from "../../base/sidebar";

const SideBar = () => {
  return (
    <div className="w-[18%] max-w-[300px] min-w-[250px] bg-[#181818] pt-8 px-4 overflow-auto">
      <h1 className=" text-3xl font-bold pb-3">
        <span className="text-primary">TL</span> Movie{" "}
      </h1>
      <div className="list-sidebar">
        {sidebar.map((group) => (
          <div className="pt-4" key={group.group}>
            <p className="text-sm opacity-25 pb-2">{group.group}</p>
            <div className="flex flex-col pl-4 gap-3 ">
              {group.items.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary flex gap-x-2 items-center"
                      : "flex gap-x-2 items-center"
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

      <div className="pt-4">
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
      </div>
    </div>
  );
};

export default SideBar;