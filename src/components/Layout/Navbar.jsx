import React, { useState } from "react";
import { Bell, LogOut, Menu, User, Volume } from "react-feather";
import { useAuth } from "../../context/AuthProvider";
import MenuComp from "../common/MenuComp";
import LOGO from "../../assets/image/LOGO.png";

export const Notice = ({ ...props }) => {
  return (
    <div className="py-3 px-4 flex items-center hover:bg-gray-50 h-24">
      <div className="w-10">
        <Volume className="w-10 h-10 text-gray-400" />
      </div>
      <div className="w-full flex flex-col justify-between text-secondary h-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="font-medium">{props?.title}</h1>
          <span className="text-xs">{props?.fromNow}</span>
        </div>
        <p className="h-full text-sm">{props?.description}</p>
      </div>
    </div>
  );
};

const noticesData = [
  {
    id: "01",
    element: (
      <Notice
        title="First Notices"
        description="First Description"
        fromNow="Created 1h ago"
      />
    ),
  },
  {
    id: "02",
    element: (
      <Notice
        title="Second Notices"
        description="Second Description"
        fromNow="Created 1h ago"
      />
    ),
  },
  {
    id: "03",
    element: (
      <Notice
        title="Third Notices"
        description="Third Description"
        fromNow="Created 1h ago"
      />
    ),
  },
  {
    id: "04",
    element: (
      <Notice
        title="Forth Notices"
        description="Forth Description"
        fromNow="Created 1h ago"
      />
    ),
  },
];

const navMenuData = [
  {
    id: "01",
    href: "/profile",
    icon: <User />,
    label: "My Profile",
  },
];

const Navbar = ({ onOpenSidebar, ...props }) => {
  const { userProfile, handleLogout } = useAuth();

  const [notices, setNotices] = useState(noticesData);
  const [menuOption, setMenuOption] = useState(navMenuData);

  return (
    <nav className="bg-white h-20 rounded shadow flex justify-between items-center  xl:text-base lg:text-base md:text-sm sm:text-xs text-xs">
      <div className="flex gap-6 items-center p-6">
        <Menu
          className="text-gray-400 cursor-pointer w-7 h-7"
          onClick={onOpenSidebar}
        />
        <h3 className="font-pacifico text-primary text-4xl">Taskify</h3>
      </div>
      <div className="flex items-center gap-4">
        <MenuComp
          MenuItems={notices}
          className="lg:w-[28rem] xl:w-[28rem] md:w-[28rem] sm:w-[24rem] w-[24rem] rounded h-80 overflow-y-scroll no-scrollbar-thin"
          classNameElement="border-t border-gray-300"
        >
          <span className="flex items-center text-gray-400 p-3 rounded cursor-pointer relative">
            <span className="absolute bg-primary text-xs text-white w-3 h-3 p-2 flex items-center justify-center rounded-full top-2 right-2">
              {notices?.length}
            </span>
            <Bell className="w-6 h-6" />
          </span>
        </MenuComp>
        <span
          onClick={handleLogout}
          className="flex lg:hidden xl:hidden md:hidden sm:flex lg:mr-0 xl:mr-0 md:mr-0 sm:mr-4 mr-4 items-center text-gray-400 p-3 rounded cursor-pointer relative"
        >
          <LogOut className="w-6 h-6" />
        </span>
        <MenuComp MenuLink={menuOption}>
          <div className="hidden items-center min-w-[10rem] max-w-[20rem] border-l-2 border-gray-100 px-4 gap-4 sm:hidden md:flex lg:flex xl:flex">
            <div className="flex items-center w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-full"
                src={userProfile?.profilePicture}
                alt="User profile"
              />
            </div>
            <span className="text-secondary">{userProfile?.name}</span>
          </div>
        </MenuComp>
      </div>
    </nav>
  );
};

export default Navbar;
