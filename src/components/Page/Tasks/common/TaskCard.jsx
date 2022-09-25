import { upperCase } from "lodash";
import React from "react";

const TaskCard = ({ dragRef, task, ...props }) => {
  const styleWithType = (param) => {
    switch (param) {
      case "urgent":
        return "border-blue-400 bg-blue-50";
      case "story":
        return "border-green-400 bg-green-50";
      case "bug":
        return "border-red-400 bg-red-50 ";
      default:
        return "border-gray-400 bg-gray-50 ";
    }
  };

  const textStyleWithType = (param) => {
    switch (param) {
      case "urgent":
        return "text-blue-400";
      case "story":
        return "text-green-400";
      case "bug":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  //   TASK_STATUS.find((item) => item?.value === task?.status).label

  return (
    <div
      ref={dragRef}
      {...props}
      className={`p-2 px-3 my-2 rounded border-l-8 shadow ${styleWithType(
        task?.type
      )}`}
    >
      <span className="text-sm text-gray-500">{task?.taskNo}</span>
      <p className="text-base font-medium py-2 text-gray-800">
        {task?.heading}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${textStyleWithType(task?.type)}`}
        >
          {upperCase(task?.type)}
        </span>
        <span className="flex w-7 h-7 rounded-full overflow-hidden items-center">
          <img
            src={task?.assignTo?.profilePicture}
            alt={task?.assignTo?.name}
          />
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
