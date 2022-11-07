import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
// import { AiFillSetting } from "react-icons/ai";
// import { IoLogOut } from "react-icons/io5";
import { sidebar } from "../../base/sidebar";
import { useAuth } from "../../context/auth-context";
import Button from "../Button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import avatarDefault from "../../images/avatar_default.jpg";
import {
  AiFillSetting,
} from "react-icons/ai";
const SideBar = React.forwardRef((props, ref) => {
  const { showNav } = props;
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const handleLogout = () => {
    signOut(auth);
    window.location.reload();
  };
  return (
    <div
      ref={ref}
      className={`sidebar overflow-y-auto absolute -traslate-x-0 md:relative left:0 w-[18%] max-w-[300px] min-w-[250px] h-full bg-[#181818] pt-8 px-4 overflow-auto  z-50 ${
        !showNav && "-translate-x-[100%] opacity-0"
      }`}
    >
      <h1 className="pb-3 text-3xl font-bold ">
        <span className="text-primary">TL</span> Movie{" "}
      </h1>
      <div className="capitalize list-sidebar">
        {sidebar.map((group) => (
          <div className="pt-4" key={group.group}>
            <p className="pb-2 pl-1 text-sm opacity-25">{group.group}</p>
            <div className="flex flex-col gap-3 pl-1 ">
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
        {userInfo && (
          <div className="pt-4" >
            <p className="pb-2 pl-1 text-sm opacity-25">General</p>
            <div className="flex flex-col gap-3 pl-1 ">
                <NavLink
              to={"/user"}
              className={({ isActive }) =>
                isActive ? "active sidebar-item" : "sidebar-item"
              }
            >
              <img
                src={avatarDefault}
                alt=""
                className="object-cover w-6 h-6 rounded-full"
              />
              <span>{userInfo.fullName || "Anonymous"}</span>
            </NavLink>
            <NavLink
                  to={'/setting'}
                  className={({ isActive }) =>
                    isActive ? "active sidebar-item" : "sidebar-item"
                  }
                >
                  <span className="text-xl"><AiFillSetting></AiFillSetting></span>
                  Setting
                </NavLink>
            </div>
          </div>

        )}

        <div className="flex flex-col gap-2 mt-5 mb-10">
          {!userInfo ? (
            <>
              <Button fluid to="/sign-in">
                Sign in
              </Button>
              <span className="text-sm text-center ">
                Dont have an account?<br />
                <a href="/sign-up" className="text-primary">
                  Sign up
                </a>
              </span>
            </>
          ) : (
            <Button fluid onClick={handleLogout}>
              <BiLogOut></BiLogOut>Log out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

export default SideBar;
