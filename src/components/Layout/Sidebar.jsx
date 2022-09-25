import React, { useState } from "react";
import { useEffect } from "react";
import { Box, CheckSquare, List, LogOut, Settings } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { userProfileData } from "../../utils/constant";

const navigateData = [
  {
    id: "_dashboard",
    title: "Dashboard",
    icon: <Box />,
    pathname: "/",
    active: false,
  },
  {
    id: "_tasks",
    title: "Task",
    icon: <CheckSquare />,
    pathname: "/tasks",
    active: false,
  },
  {
    id: "_users",
    title: "Users",
    icon: <List />,
    pathname: "/users",
    active: false,
  },
  // {
  //   id: "_setting",
  //   title: "Setting",
  //   icon: <Settings />,
  //   pathname: "/settings",
  //   active: false,
  // },
];

const Sidebar = ({ isOpen, ...props }) => {
  const { userProfile, handleLogout } = useAuth();
  const [navigation, setNavigation] = useState(navigateData);
  const location = useLocation();

  useEffect(() => {
    const updatedNav = navigation.map((nav) => {
      const currentPathname = location.pathname.split("/");
      if (nav?.pathname === `/${currentPathname[1]}`) {
        return { ...nav, active: true };
      } else {
        return { ...nav, active: false };
      }
    });
    setNavigation(updatedNav);
  }, [location]);

  return (
    <nav
      className={`bg-white z-30 mt-1 h-[calc(100%_-_0.5rem)] md:ml-0 lg:ml-0 xl:-ml-0  rounded shadow transition-all duration-300 p-4 flex flex-col justify-between items-center lg:relative xl:relative sm:absolute md:relative absolute  xl:text-base lg:text-base md:text-sm sm:text-xs text-xs ${
        isOpen
          ? "w-72 ml-0"
          : "w-[90px] -ml-[98px] sm:-ml-[98px] md:ml-0 lg:ml-0 xl:-ml-0"
      }`}
    >
      <div className="w-full">
        {navigation.map((nav) => {
          return (
            <Link
              key={nav?.id}
              to={nav?.pathname}
              className={`w-full h-14 flex items-center p-4 rounded overflow-hidden mb-3 ${
                nav?.active
                  ? "bg-primary text-white shadow"
                  : "hover:bg-gray-50 text-gray-400"
              }`}
            >
              <span className="w-6 flex items-center">{nav?.icon}</span>
              <span className="uppercase font-medium ml-5">{nav?.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="w-full">
        <button
          onClick={handleLogout}
          className={`w-full h-14 items-center p-4 rounded overflow-hidden hover:bg-gray-50 text-gray-400 hidden lg:flex xl:flex md:flex`}
        >
          <span className="w-6 flex items-center">
            <LogOut />
          </span>
          <span className="uppercase font-medium ml-5">Logout</span>
        </button>
        <div className="flex items-center w-full h-16 overflow-hidden sm:flex md:hidden lg:hidden xl:hidden">
          <div className="flex items-center justify-center min-w-[3.5rem] w-14 h-14 rounded-full overflow-hidden">
            <img
              className="w-14"
              src={userProfile?.profilePicture}
              alt="User profile"
            />
          </div>
          <span className="text-secondary xl:text-base lg:text-base md:text-sm sm:text-xs text-xs ml-5">
            {userProfile?.name}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
