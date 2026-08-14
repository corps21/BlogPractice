import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDefaultAvatarUrl, toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/service/userService";
import { Button } from "@/components/ui/button";
import { CustomFileInput } from "@/components/custom/CustomFileInput";
import {ControlledInput} from "@/components/custom/ControlledInput";
import {useEffect} from "react";

const toastOptions = {
	loading: "Uploading the avatar",
	success: `Succesfully updated the avatar`,
	error: (err) => `Something went wrong ( ${err} )`,
	richColors: true,
};

export default function SettingsForm() {
	const avatar = useSelector((state) => state?.user?.userData?.avatarUrl);

	const {
		control,
		formState: {isSubmitSuccessful},
		handleSubmit,
		setValue,
		getValues,
		reset,
	} = useForm({
		defaultValues: {
			avatar: avatar?? getDefaultAvatarUrl(),
		}
	});

	// console.log(userData)

	const onSubmit = async (data) => {
		console.log(data)
		// setValue("avatar", userData?.avatarUrl);
		// handleUpdateAvatar(data.avatar[0]);
	};
	
	useEffect(() => {
		console.log(getValues("avatar"));
		if (isSubmitSuccessful) {
			reset({
				avatar: avatar ?? "",
			});
		}
	}, [isSubmitSuccessful,avatar, reset, getValues]);

	const handleUpdateAvatar = (avatar) => {
		console.log(avatar);
		toastPromiseWrapper(async (resolve, reject) => {
			const result = await userService.updateAvatar({ avatar });
			if (result.success) {
				window.location.reload();
				resolve();
			} else {
				reject(result?.message);
			}
		}, toastOptions);
	};

	return (
		<form
			className="grid gap-8 md:max-w-6xl md:grid-cols-2 bg-card p-8 rounded-lg"
			onSubmit={handleSubmit(onSubmit)}
		>
			<section>
				<CustomFileInput
					control={control}
					name="avatar"
					type="file"
				/>

				<Button
					type="submit"
					className="w-full text-base px-3 py-2 rounded-[6px] font-medium mt-4"
				>
					Submit
				</Button>
			</section>
		</form>
	);
}
