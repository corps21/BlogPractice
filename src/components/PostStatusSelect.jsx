import { Controller } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from "@/components/ui/select";

const PostStatusSelect = ({
	name,
	control,
	...props
}) => {

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, ...field } }) => (
				<Select
					onValueChange={onChange}
					onOpenChange={onBlur}
					{...field}
					{...props}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select the post status" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem key="public" value="public">Public</SelectItem>
							<SelectItem key="private" value="private">Private</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			)}
		/>
	)
};

export default PostStatusSelect;
