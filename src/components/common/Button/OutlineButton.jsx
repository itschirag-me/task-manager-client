import React from "react";

const OutlineButton = ({ type = "button", children, ...props }) => {
  return (
    <button
      className="p-5 py-2 border-2 border-primary rounded-full text-primary shadow"
      {...props}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
