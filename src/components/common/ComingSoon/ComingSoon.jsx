import React from "react";
import ComingSoonImage from "../../../assets/image/undraw_under_construction.svg";

const ComingSoon = () => {
  return (
    <div className="w-full p-10 py-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-14">
        <img className="w-4/5" src={ComingSoonImage} alt="Coming soon" />
        <div className="text-secondary">
          <h4 className="text-3xl font-medium">Coming soon</h4>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
