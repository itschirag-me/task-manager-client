import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import Main from "./Main";
import Navbar from "./Navbar";

const Layout = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarMenu = () => setIsOpen(!isOpen);
  return (
    <div className="h-screen bg-gray-100 select-none">
      <Navbar onOpenSidebar={handleSidebarMenu} />
      <Main isOpen={isOpen} onOpenSidebar={handleSidebarMenu}>
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;
