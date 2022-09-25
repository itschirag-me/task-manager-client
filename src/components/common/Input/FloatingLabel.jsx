import React, { useId, useState } from "react";
import { Eye, EyeOff } from "react-feather";

const FloatingLabel = ({
  type = "text",
  label = "Text",
  placeholder = "Text",
  name,
  value,
  onChange,
  errorMessage,
  marginBottom = "6",
  ...props
}) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className={`relative mb-${marginBottom}`}>
        <input
          type={!showPassword ? "password" : "text"}
          className="p-2.5 rounded w-full ring-2 ring-gray-300 text-secondary focus:ring-2 focus:ring-primary focus:border-0 focus:outline-none peer"
          value={value}
          id={id}
          name={name}
          autoComplete="off"
          onChange={onChange}
          {...props}
        />
        <label
          className={`absolute left-3 top-2.5 text-gray-400 cursor-pointer transition-all duration-300 xl:text-base lg:text-base md:text-base sm:text-sm text-sm ${
            value
              ? "-top-3 left-1 bg-white px-1 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"
              : "peer-focus:-top-3 peer-focus:left-1 peer-focus:bg-white peer-focus:px-1 peer-focus:text-sm"
          }`}
          htmlFor={id}
        >
          {label || placeholder}
        </label>
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 cursor-pointer top-2.5"
        >
          {showPassword ? (
            <Eye className="text-gray-400 w-4" />
          ) : (
            <EyeOff className="text-gray-400 w-4" />
          )}
        </span>
        {errorMessage && (
          <span className="block w-full text-xs text-red-400 pl-1 absolute -bottom-5 left-0">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative mb-${marginBottom}`}>
      <input
        type={type}
        className="p-2.5 rounded w-full ring-2 ring-gray-300 text-secondary focus:ring-2 focus:ring-primary focus:border-0 focus:outline-none peer xl:text-base lg:text-base md:text-base sm:text-sm text-sm"
        value={value}
        id={id}
        autoComplete="off"
        name={name}
        onChange={onChange}
        {...props}
      />
      <label
        className={`absolute left-3 top-2.5 text-gray-400 cursor-pointer transition-all duration-300 xl:text-base lg:text-base md:text-base sm:text-sm text-sm ${
          value
            ? "-top-3 left-1 bg-white px-1 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"
            : "peer-focus:-top-3 peer-focus:left-1 peer-focus:bg-white peer-focus:px-1 peer-focus:text-sm"
        }`}
        htmlFor={id}
      >
        {label || placeholder}
      </label>
      {errorMessage && (
        <span className="block text-xs text-red-400 w-full absolute -bottom-5 left-0 ">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FloatingLabel;
