import React from "react";
import Sidebar from "./Sidebar";

const Main = ({ isOpen, onOpenSidebar, children }) => {
  return (
    <div className="flex h-[calc(100%_-_5rem)] relative">
      <Sidebar isOpen={isOpen} />
      {isOpen && (
        <div
          onClick={onOpenSidebar}
          className="absolute z-20 top-0 left-0 w-full h-full bg-blackTransparent lg:hidden xl:hidden md:hidden"
        ></div>
      )}
      <div className="w-full overflow-y-scroll no-scrollbar mt-1 ml-2">
        {children}
      </div>
    </div>
  );
};

export default Main;
