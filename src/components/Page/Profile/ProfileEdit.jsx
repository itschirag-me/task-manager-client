import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useAuth } from "../../../context/AuthProvider";
import { UpdateUserProfileService } from "../../../services/Auth/UserService";
import Button from "../../common/Button/Button";
import FloatingLabel from "../../common/Input/FloatingLabel";
import Select from "../../common/Input/Select";

const ProfileEdit = () => {
  const { userProfile, setUserProfile } = useAuth();

  const handleUpdateProfile = async (payload) => {
    console.log(payload);
    const userData = await UpdateUserProfileService(payload);
    if (!userData?.isSuccess) {
      toast.error(userData?.errorMessage);
      return;
    }
    setUserProfile({ ...userProfile, ...payload, gender: payload?.gender?.value });
    toast.success(userData?.message || "Updated successfully");
  };

  const formik = useFormik({
  initialValues: {
      name: userProfile?.name,
      gender: userProfile?.gender
        ? { value: userProfile?.gender, label: userProfile?.gender }
        : "",
      contact: {
        email: userProfile?.contact.email,
        contactNumber: userProfile?.contact.contactNumber,
      },
      address: userProfile?.address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      gender: Yup.object().nullable().required("Gender is required"),
      contact: Yup.object({
        email: Yup.string().required("Email is required"),
        contactNumber: Yup.string().required("Phone is required"),
      }),
      address: Yup.string().required("Address is required"),
    }),

    onSubmit: handleUpdateProfile,
  });

  const genderOptions = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
  ];

  return (
    <div className="bg-white p-5 rounded shadow w-full flex flex-col gap-10 justify-between">
      <div className="w-60 p-5">
        <div className="w-36 h-36 overflow-hidden flex items-center justify-center border-[6px] border-white rounded-full">
          <img
            className="w-full"
            src={userProfile?.profilePicture}
            alt={userProfile?.name}
          />
        </div>
      </div>
      <div className="w-full p-5">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
          <div className="grid grid-cols-2 gap-6">
            <FloatingLabel
              name="name"
              type="text"
              label="Full name"
              value={formik.values?.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik?.touched?.name && formik?.errors?.name}
            />
            <Select
              name="gender"
              options={genderOptions}
              label="Gender"
              value={formik?.values?.gender}
              onChange={(value) => {
                formik?.setFieldValue("gender", value);
              }}
              onBlur={formik.handleBlur}
              errorMessage={formik?.errors?.gender}
            />
          </div>
          <FloatingLabel
            name="contact.email"
            type="email"
            label="Email"
            value={formik.values?.contact?.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik?.touched?.contact?.email && formik?.errors?.contact?.email
            }
          />
          <FloatingLabel
            name="contact.contactNumber"
            type="text"
            label="Phone"
            value={formik.values?.contact?.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik?.touched?.contact?.contactNumber &&
              formik?.errors?.contact?.contactNumber
            }
          />
          <FloatingLabel
            name="address"
            type="text"
            label="Address"
            value={formik.values?.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik?.touched?.address && formik?.errors?.address}
          />
          <div className="flex items-center justify-end">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
