import React from "react";
import NoDataImg from "../../../assets/image/undraw_no_data.svg";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center p-2 w-full h-full gap-10">
      <h2 className="text-xl text-secondary">No Data available</h2>
      <img className="w-auto h-1/2" src={NoDataImg} />
    </div>
  );
};

export default NoData;
