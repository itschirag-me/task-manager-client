import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const Button = ({
  type = "button",
  children,
  icon,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        "lg:p-3 lg:py-1.5 sm:py-1 xl:py-1.5 xl:p-3 md:p-1.5 sm:p-1 p-1 py-1 border-2 text-sm xl:text-base lg:text-base md:text-sm border-primary ring-2 ring-primary bg-primary rounded text-white flex items-center xl:gap-2 lg:gap-2 md:gap-2 sm:gap-1 shadow",
        className,
        isLoading
          ? "bg-gray-200 border-gray-200 ring-2 ring-gray-200 text-gray-600"
          : "",
      ].join(" ")}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <ButtonLoader />}
      {icon ? icon : ""}
      {children}
    </button>
  );
};

export default Button;
