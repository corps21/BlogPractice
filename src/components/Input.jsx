import { forwardRef } from "react"
import Label from "./Label"

const Input = forwardRef(({ label, placeholder = "", type = "text", className = "", readOnly = false, containerClass = "" , ...props}, ref) => {
    return (
        <div className={`flex flex-col space-y-2 ${containerClass}`}>
            {label && (
                <Label label={label}/>
            )}
            <input readOnly={readOnly} className={`text-lg border-2 p-[.65rem] rounded-lg border-gray-200 bg-gray-200 ${className}`} type={type} placeholder={placeholder} ref={ref} {...props} />
        </div>
    )
})

export default Input
