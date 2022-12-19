import React from "react";
import SignUpPageImg from "../../assets/image/undraw_sign_in.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import FloatingLabel from "../common/Input/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import {
  AuthCheckEmail,
  AuthSignUpService,
} from "../../services/Auth/AuthService";
import toast from "react-hot-toast";
import { capitalize } from "lodash";
import Select from "../common/Input/Select";

const SignUp = () => {
  const navigator = useNavigate();

  const handleSignup = async (payload) => {
    const { name, gender, contact, address, password } = payload;
    const signupData = await AuthSignUpService({
      name,
      gender: gender?.value,
      contact,
      address,
      password,
    });
    if (!signupData?.isSuccess) {
      toast.error(capitalize(signupData?.errorMessage));
      return;
    }

    toast.success("User successfully created");
    navigator("/login");
  };

  const checkEmailAvailibity = async (value) => {
    const checkEmailData = await AuthCheckEmail({ email: value });
    return checkEmailData?.data?.isAvailable;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      contact: {
        email: "",
        contactNumber: "",
      },
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      gender: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
      })
        .nullable()
        .required("Gender is required"),
      contact: Yup.object({
        email: Yup.string()
          .email("Email must be a valid email")
          .test("userEmailExist", "Email is already Exist", (value) =>
            checkEmailAvailibity(value)
          )
          .required("Email is required"),
        contactNumber: Yup.string()
          .min(6, "Phone number must be at least 8 characters")
          .max(14, "Phone number must be at most 13 characters")
          .required("Phone is required"),
      }),
      address: Yup.string().required("Address is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 charaters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm password must match with password"
        )
        .required("Confirm password is required"),
    }),
    onSubmit: handleSignup,
  });

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className="xl:bg-gray-50 lg:bg-gray-50 md:bg-gray-50 sm:bg-white bg-white  w-full xl:w-auto lg:w-auto md:w-auto flex items-center justify-center h-screen">
      <div className="w-full xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-full lg:px-4 xl:px-4 md:px-4 px-0 flex justify-center items-center">
        <div className="bg-white p-5 py-5 xl:p-8 lg:p-8 md:p-6 sm:p-5 xl:py-8 lg:py-8 md:py-6 sm:py-5 w-full xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-full rounded">
          <h3 className="text-6xl font-pacifico text-primary mb-10">Taskify</h3>
          <h3 className="text-3xl mb-6 font-medium uppercase text-primary">
            Sign up
          </h3>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 w-full"
          >
            <div className="grid grid-cols-2 gap-4">
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
                value={formik?.values?.gender}
                options={genderOptions}
                errorMessage={formik?.errors?.gender}
                onChange={(value) => formik.setFieldValue("gender", value)}
              />
            </div>
            <span className="text-xs uppercase text-gray-300 font-medium">
              Contact
            </span>
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabel
                name="contact.email"
                type="email"
                label="Email"
                value={formik.values?.contact?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik?.touched?.contact?.email &&
                  formik?.errors?.contact?.email
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
            </div>
            <span className="text-xs uppercase text-gray-300 font-medium">
              Street Address
            </span>
            <FloatingLabel
              name="address"
              type="text"
              label="Address"
              value={formik.values?.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik?.touched?.address && formik?.errors?.address}
            />
            <span className="text-xs uppercase text-gray-300 font-medium">
              Passwords
            </span>
            <FloatingLabel
              name="password"
              type="password"
              label="Password"
              marginBottom="6"
              value={formik.values?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                formik?.touched?.password && formik?.errors?.password
              }
            />
            <FloatingLabel
              name="confirmPassword"
              type="password"
              label="Confirm password"
              value={formik.values?.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                formik?.touched?.confirmPassword &&
                formik?.errors?.confirmPassword
              }
            />
            {/* <div className="text-secondary flex justify-end">
              <Link className="text-primary underline" to="/signup">
                Forgot password
              </Link>
            </div> */}
            <div className="my-4 flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
            <span className="text-secondary">
              Already have an account?{" "}
              {
                <Link className="text-primary underline" to="/login">
                  Sign in
                </Link>
              }
            </span>
          </form>
        </div>
      </div>
      <div className="w-1/2 px-4 xl:flex lg:flex md:hidden sm:hidden hidden ">
        <img src={SignUpPageImg} className="" alt="Login" />
      </div>
    </div>
  );
};

export default SignUp;
