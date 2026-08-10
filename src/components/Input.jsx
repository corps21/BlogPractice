/* eslint-disable react/display-name */
import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
		ref,
	) => {
		const id = useId();
		return (
			<div className={cn("flex flex-col", containerClass)}>
				{label && (
					<Label
						htmlFor={id}
						className={`text-xs md:text-base ${errors[registerId] ? "text-red-500 dark:text-red-500" : ""}`}
					>
						{label}
					</Label>
				)}
				<Input
					readOnly={readOnly}
					className={`mt-1
            ${errors[registerId] ? "border-red-500 dark:border-red-500" : ""}
            ${className}`}
					type={type}
					placeholder={placeholder}
					ref={ref}
					id={id}
					{...props}
					aria-invalid={errors[registerId] ? "true" : "false"}
				></Input>
				{errors[registerId]?.type === "required" && (
					<p role="alert" className="text-sm text-red-500 font-medium">
						{label} is required
					</p>
				)}
			</div>
		);
	},
);

export default InputWrapper;
