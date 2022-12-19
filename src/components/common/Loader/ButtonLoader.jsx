import React from "react";
import {
  Oval,
} from "react-loader-spinner";

const ButtonLoader = () => {
  return (
    <Oval
      height="20"
      width="20"
      color="#fff"
      secondaryColor="#fff"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      strokeWidth={9}
      wrapperClass=""
      visible={true}
    />
  );
};

export default ButtonLoader;
