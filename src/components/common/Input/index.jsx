import React, { useId, useState } from "react";
import { Eye, EyeOff } from "react-feather";

const Input = ({
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
          placeholder={label || placeholder}
          autoComplete={false}
          onChange={onChange}
          {...props}
        />
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
        placeholder={label || placeholder}
        name={name}
        onChange={onChange}
        {...props}
      />
      {errorMessage && (
        <span className="block text-xs text-red-400 w-full absolute -bottom-5 left-0">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
