import React, { useState } from "react";
import ReactSelect from "react-select";
import { isEmpty } from "lodash";
import { useId } from "react";

const Select = ({
  value,
  label = "Select",
  isClearable = true,
  options = [
    {
      label: "Value 1",
      value: "value1",
    },
    {
      label: "Value 2",
      value: "value2",
    },
  ],
  placeholder,
  className,
  errorMessage,
  marginBottom = "6",
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const selectId = useId();
  const defaultStyle = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.25rem 0",
      border: 0,
      boxShadow: state?.isFocused ? "0 0 0 2px #FFBE78" : "0 0 0 2px #99999975",
    }),
    input: (provided, state) => ({
      ...provided,
      padding: "0",
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
      borderRadius: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state?.isSelected ? "white" : "rgb(107,114,128)",
      backgroundColor: state?.isSelected ? "#FFBE78" : "",
      ":active": {
        backgroundColor: "#FFBE7850",
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      backgroundColor: "#eee",
      color: "white",
      fontSize: "16px",
      borderWidth: 2,
      borderColor: "white",
    }),
  };
  return (
    <div
      className={[`relative h-auto mb-${marginBottom}`, className].join(" ")}
    >
      <ReactSelect
        id={selectId}
        placeholder={false}
        isClearable={isClearable}
        options={options}
        value={value}
        onInputChange={(value) => setInputValue(value)}
        styles={defaultStyle}
        {...props}
      ></ReactSelect>
      <label
        className={`absolute left-2.5 top-2.5 text-gray-400 cursor-pointer transition-all duration-300 xl:text-base lg:text-base md:text-base sm:text-sm text-sm ${
          !isEmpty(value) || inputValue
            ? "-top-3 left-0.5 bg-white px-1 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"
            : ""
        }`}
        htmlFor={selectId}
      >
        {label || placeholder}
      </label>
      {errorMessage && (
        <span className="w-full text-xs text-red-400 mt-0.5 absolute -bottom-4.5 left-0">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Select;
