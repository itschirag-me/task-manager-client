import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";

const Tasks = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <Outlet />
    </React.Fragment>
  );
};

export default Tasks;
