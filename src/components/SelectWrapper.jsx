/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef, useId } from "react";
import Label from "./Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectWrapper = forwardRef(
  ({
    options = [
      { name: "Active", value: "active" },
      { name: "Inactive", value: "inactive" },
    ],
    defaultValue = "active",
    label = "",
    className = "",
    containerClass = "",
    isDisabled=false,
    ...props
  },ref) => {
    const id = useId();
    return (
      <div ref={ref} className={`mt-4 ${containerClass}`}>
        {label && <Label htmlFor={id} label={label} />}
        <Select id={id} disabled={isDisabled} defaultValue={defaultValue}>
          <SelectTrigger className={`border-black border-[1px] px-3 py-2 rounded-[4px] ${className}`} {...props} >
            <SelectValue placeholder="Select a status"/>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.name} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

export default SelectWrapper;
