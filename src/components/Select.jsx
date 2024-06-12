import React from "react";

function Select({
  options=[{name:"Active",value:"active"},{name:"Inactive",value:"inactive"}],
  label="",
  className = "",
  containerClass = "",
  ...props
}) {
  return (
    <div className={`space-y-2 pt-[1rem] pb-[2rem] ${containerClass}`}>
      {label && <label className="text-bold text-xl">{label}</label>}

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
