import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginPageImg from "../../assets/image/undraw_login.svg";
import { useAuth } from "../../context/AuthProvider";
import {
  AuthLoginService,
  setAuthHeader,
} from "../../services/Auth/AuthService";
import { UserProfileService } from "../../services/Auth/UserService";
import Button from "../common/Button/Button";
import FloatingLabel from "../common/Input/FloatingLabel";
import Loader from "../common/Loader";

const Login = () => {
  const { setUserProfile, setIsLoggedIn, handleLogout } = useAuth();
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const handleLogin = async (payload) => {
    setBtnLoader(true);
    const loginData = await AuthLoginService(payload);
    if (!loginData?.isSuccess) {
      toast.error(loginData?.errorMessage || "Something went wrong");
      setBtnLoader(false);
      setTimeout(() => setLoader(false), 1000);
      return;
    }
    localStorage.setItem("authToken", JSON.stringify(loginData?.data?.token));
    setAuthHeader();
    setTimeout(handleLogout, loginData?.data?.timeout * 1000);
    const userData = await UserProfileService();
    setUserProfile(userData?.data);
    setIsLoggedIn(true);
    toast.success(loginData?.message);
    setTimeout(() => setLoader(false), 1000);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
    }),
    onSubmit: handleLogin,
  });

  if (loader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="xl:bg-gray-50 lg:bg-gray-50 md:bg-gray-50 sm:bg-white bg-white w-full xl:w-auto lg:w-auto md:w-auto flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-col items-center justify-center h-screen">
      <div className="w-1/2 px-4 xl:flex lg:flex md:hidden sm:hidden hidden ">
        <img src={LoginPageImg} className="" alt="Login" />
      </div>
      <div className="w-full xl:w-1/2 lg:1/2 md:2/3 sm:w-11/12 xl:px-4 lg:p-4 md:px-2 sm:px-0 px-0 flex justify-center items-center">
        <div className="bg-white p-5 py-8 xl:p-8 lg:p-8 md:p-6 sm:p-5 xl:w-2/3 lg:w-2/3 md:w-3/4 sm:w-full w-full shadow rounded">
          <h3 className="text-6xl font-pacifico text-primary mb-10 mt-4">
            Taskify
          </h3>

          <h3 className="text-3xl mb-6 font-medium uppercase text-primary">
            Sign in
          </h3>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 w-full"
          >
            <FloatingLabel
              name="email"
              type="email"
              label="Email"
              value={formik.values?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              marginBottom="6"
              errorMessage={formik?.touched?.email && formik?.errors?.email}
            />
            <FloatingLabel
              name="password"
              type="password"
              label="Password"
              value={formik.values?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                formik?.touched?.password && formik?.errors?.password
              }
            />
            <div className="text-secondary flex justify-end">
              <Link className="text-primary underline" to="/signup">
                Forgot password
              </Link>
            </div>

            <div className="my-4 flex justify-end">
              <Button isLoading={btnLoader} type="submit">
                Submit
              </Button>
            </div>

            <span className="text-secondary">
              No account yet?{" "}
              {
                <Link className="text-primary underline" to="/signup">
                  Sign up
                </Link>
              }
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
