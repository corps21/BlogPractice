/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef, useId } from "react";
import Label from "./Label";
const Select = forwardRef(
  ({
    options = [
      { name: "Active", value: "active" },
      { name: "Inactive", value: "inactive" },
    ],
    label = "",
    className = "",
    containerClass = "",
    ...props
  },ref) => {
    const id = useId();
    return (
      <div className={`space-y-2 pt-[1rem] pb-[2rem] ${containerClass}`}>
        {label && <Label htmlFor={id} label={label} />}

        <select
          id={id}
          ref={ref}
          className={`w-full p-[.65rem] text-lg bg-gray-200 rounded-lg ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
