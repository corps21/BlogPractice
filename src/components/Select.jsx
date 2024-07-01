import React from "react";
import Label from "./Label";

function Select({
  options=[{name:"Active",value:"active"},{name:"Inactive",value:"inactive"}],
  label="",
  className = "",
  containerClass = "",
  ...props
}) {
  return (
    <div className={`space-y-2 pt-[1rem] pb-[2rem] ${containerClass}`}>
      {label && <Label label={label}/>}

      <select
        className={`w-full p-[.65rem] text-lg bg-gray-200 rounded-lg ${className}`}
        {...props}
      >
        {options.map((option) => (<option key={option.name} value={option.value}>{option.name}</option>))}
        
      </select>
    </div>
  );
}

export default Select;
