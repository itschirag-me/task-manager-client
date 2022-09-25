import React from "react";
import { Circles, CirclesWithBar, FidgetSpinner, MutatingDots, Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height="60"
      width="60"
      color="#FFBE78"
      secondaryColor="#FFBE78"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      strokeWidth={5}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
