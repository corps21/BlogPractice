/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef, useId } from "react";
import { Input } from "./ui/input";
import Label from "./Label";

const InputWrapper = forwardRef(
  (
    {
      errors,
      registerId,
      label,
      placeholder = "",
      type = "text",
      className = "",
      readOnly = false,
      containerClass = "",
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <div className={`flex flex-col ${containerClass}`}>
        {label && <Label htmlFor={id} label={label} className={`${errors[registerId] ? "text-red-500" : ""}`}/>}
        <Input
          readOnly={readOnly}
          className={`text-base border-[1px] px-3 py-2 rounded-[4px] placeholder:text-red-500
            ${errors[registerId] ? "border-red-500" : "border-gray-700"}
            ${className}`}
          type={type}
          placeholder={placeholder}
          ref={ref}
          id={id}
          {...props}
          aria-invalid={errors[registerId] ? "true" : "false"}
        ></Input>
        {errors[registerId]?.type === "required" && (
          <p role="alert" className="text-sm text-red-500 font-medium">{label} is required</p>
        )}
      </div>
    );
  }
);

export default InputWrapper;
