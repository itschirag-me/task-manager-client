import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { UsersListService } from "../../../services/Auth/UserService";
import Table from "../../common/Table";
import Breadcrumb from "../../common/Breadcrumb/index";
import { isEmpty } from "lodash";
import NoData from "../../common/NoData/NoData";
import Loader from "../../common/Loader";

const Users = () => {
  const [usersData, setUsersData] = useState({});
  // const [filterAction, setFilterAction] = useState({
  //   pageNo: 1,
  //   limit: 10,
  //   sortBy: "name",
  //   sortOrder: 1,
  // });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const userList = await UsersListService();
    if (!userList.isSuccess) {
      toast.error(userList?.errorMessage || "Something went wrong");
      return;
    }
    setUsersData(userList?.data);
  };

  useEffect(() => {
    fetchUser();
    setIsLoading(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "profilePicture",
        disableSortBy: true,
        Cell: ({ value }) => {
          return <img className="w-8 h-8 rounded-full" src={value} />;
        },
      },
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Email",
        accessor: "contact.email",
      },
      {
        Header: "Phone",
        disableSortBy: true,
        accessor: "contact.contactNumber",
      },
      {
        Header: "Gender",
        accessor: "gender",
        disableSortBy: true,
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="w-full h-[90%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Fragment>
      <Breadcrumb />
      <div className="no-scrollbar flex flex-col justify-between overflow-x-scroll h-[98%] xl:p-6 lg:p-6 md:p-5 sm:p-3 p-2 rounded">
        {!isEmpty(usersData?.users) ? (
          <Table
            columns={columns}
            data={usersData?.users}
            totalCount={usersData?.totalCount}
          />
        ) : (
          <NoData />
        )}
      </div>
    </Fragment>
  );
};

export default Users;
