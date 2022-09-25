import React from "react";

const Button = ({ type = "button", children, icon, className, ...props }) => {
  return (
    <button
      type={type}
      className={[
        "lg:p-3 lg:py-1.5 sm:py-1 xl:py-1.5 xl:p-3 md:p-1.5 sm:p-1 p-1 py-1 border-2 text-sm xl:text-base lg:text-base md:text-sm border-primary ring-2 ring-primary bg-primary rounded text-white flex items-center xl:gap-2 lg:gap-2 md:gap-2 sm:gap-1 shadow",
        className,
      ].join(" ")}
      {...props}
    >
      {icon ? icon : ""}
      {children}
    </button>
  );
};

export default Button;
