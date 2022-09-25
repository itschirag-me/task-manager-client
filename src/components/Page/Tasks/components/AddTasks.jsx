import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  UsersAllListService,
  UsersListService,
} from "../../../../services/Auth/UserService";
import { TaskCreateService } from "../../../../services/TaskService";
import { TASK_STATUS, TASK_TYPE } from "../../../../utils/constant";
import Button from "../../../common/Button/Button";
import FloatingLabel from "../../../common/Input/FloatingLabel";
import Select from "../../../common/Input/Select";

const AddTasks = ({}) => {
  const navigator = useNavigate();

  const handleSubmitTask = async (values) => {
    const payload = {
      heading: values?.heading,
      description: values?.description,
      assignTo: values?.assignTo?.id,
      type: values?.type?.value,
      status: values?.status?.value,
      permittedTo: values?.permittedTo?.map((item) => ({ userId: item?.id })),
    };
    const response = await TaskCreateService(payload);
    if (!response?.isSuccess) {
      toast.error(response?.errorMessage || "Something went wrong");
      return;
    }
    toast.success("Task created successfully");
    navigator("/tasks");
  };

  const [usersData, setUsersData] = useState([]);
  // const [filterAction, setFilterAction] = useState({
  //   pageNo: 1,
  //   limit: 10,
  //   sortBy: "name",
  //   sortOrder: 1,
  // });

  const fetchUser = async () => {
    const userList = await UsersAllListService();
    if (!userList.isSuccess) {
      toast.error(userList?.errorMessage || "Something went wrong");
      return;
    }

    const userListData = userList?.data?.users.map((user) => {
      return {
        id: user?._id,
        value: user?.name,
        label: (
          <div className="flex gap-6 items-center">
            <span className="flex w-7 h-7 rounded-full overflow-hidden items-center">
              <img src={user?.profilePicture} alt={user?.name} />
            </span>
            <span className={`text-sm text-gray-500 font-medium`}>
              {user?.name}
            </span>
          </div>
        ),
      };
    });

    setUsersData(userListData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      heading: "",
      assignTo: "",
      type: "",
      status: "",
      description: "",
      permittedTo: "",
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required"),
      assignTo: Yup.object().nullable().required("AssignTo is required"),
      type: Yup.object().nullable().required("Type is required"),
      status: Yup.object().nullable().required("Status is required"),
      permittedTo: Yup.array()
        .min(1, "Permitted to is required")
        .required("Permitted to is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: handleSubmitTask,
  });
  return (
    <div className="p-4 bg-white rounded shadow">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="text-xl text-secondary">Add Task</h1>
        <div className="grid mt-6 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:gap-6 md:gap-3 grid-cols-1">
          <FloatingLabel
            type="text"
            name="heading"
            value={formik?.values?.heading}
            errorMessage={formik?.touched?.heading && formik?.errors?.heading}
            label="Heading"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FloatingLabel
            type="text"
            name="description"
            value={formik?.values?.description}
            errorMessage={
              formik?.touched?.description && formik?.errors?.description
            }
            label="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="grid mt-6 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:gap-6 md:gap-3 grid-cols-1">
          <Select
            label="Status"
            value={formik?.values?.status}
            options={TASK_STATUS}
            errorMessage={formik?.errors?.status}
            onChange={(item) => formik.setFieldValue("status", item)}
          />
          <Select
            label="Type"
            name="type"
            value={formik?.values?.type}
            options={TASK_TYPE}
            errorMessage={formik?.errors?.type}
            onChange={(item) => formik.setFieldValue("type", item)}
          />
        </div>
        <div className="grid mt-6 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:gap-6 md:gap-3 grid-cols-1">
          <Select
            label="Assign to"
            value={formik?.values?.assignTo}
            options={usersData}
            errorMessage={formik?.errors?.assignTo}
            onChange={(value) => formik?.setFieldValue("assignTo", value)}
          />
          <Select
            label="Permitted to"
            value={formik?.values?.permittedTo}
            isMulti={true}
            options={usersData}
            errorMessage={formik?.errors?.permittedTo}
            onChange={(value) => formik?.setFieldValue("permittedTo", value)}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
