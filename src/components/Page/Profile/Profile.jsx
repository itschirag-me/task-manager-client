import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";

const Profile = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <Outlet />
    </Fragment>
  );
};

export default Profile;
