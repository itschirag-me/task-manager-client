import React from "react";
import { Link } from "react-router-dom";
import pageNotFound from "../../assets/image/undraw_page_not_found.svg";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src={pageNotFound} alt="" srcset="" />
      <Link
        to="/"
        className="p-6 rounded-full py-3 bg-primary text-white mt-20 shadow-lg focus:shadow"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
