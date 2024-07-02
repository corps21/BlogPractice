/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef, useId } from "react"
import Label from "./Label"

const Input = forwardRef(({ label, placeholder = "", type = "text", className = "", readOnly = false, containerClass = "" , ...props}, ref) => {
    const id = useId();
    return (
        <div className={`flex flex-col space-y-2 ${containerClass}`}>
            {label && (
                <Label htmlFor={id} label={label}/>
            )}
            <input readOnly={readOnly} className={`text-lg border-2 p-[.65rem] rounded-lg border-gray-200 bg-gray-200 ${className}`} type={type} placeholder={placeholder} ref={ref} id={id} {...props} />
        </div>
    )
})

export default Input
