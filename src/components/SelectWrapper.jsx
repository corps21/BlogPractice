/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { useId } from "react";
import { Controller } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

const SelectWrapper = ({
	options = [
		{ name: "Active", value: "active" },
		{ name: "Inactive", value: "inactive" },
	],
	label = "",
	className = "",
	containerClass = "",
	name,
	defaultValue,
	control,
	...props
}) => {
	const id = useId();
	return (
		<Controller
			control={control}
			name={name}
			render={({field: {onChange, onBlur, value, disabled}}) => {
				return (
				<div className={`mt-4 ${containerClass}`}>
					{label && <Label htmlFor={id}>{label}</Label>}
					<Select id={id} defaultValue={defaultValue} disabled={disabled} onValueChange={onChange} onOpenChange={onBlur} value={value}>
						<SelectTrigger
							className={`px-3 py-2 rounded-md ${className}`}
							{...props}
						>
							<SelectValue placeholder="Select a status" />
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
			)
			}}
		/>
	);
};

export default SelectWrapper;
