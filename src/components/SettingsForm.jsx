import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDefaultAvatarUrl, toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/service/userService";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "./custom/ControlledInput";

const toastOptions = {
	loading: "Uploading the avatar",
	success: `Succesfully updated the avatar`,
	error: (err) => `Something went wrong ( ${err} )`,
	richColors: true,
};

export default function SettingsForm() {
	const userData = useSelector((state) => state.user.userData);

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = async (data) => {
		handleUpdateAvatar(data.avatar[0]);
	};

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
			{/* <section> */}
			{/* <Input
					errors={errors}
					registerId="title"
					label="Title"
					{...register("title", {
						required: true,
					})}
				/>

				<Input
					errors={errors}
					registerId="slug"
					label="Slug"
					containerClass="mt-[1rem]"
					{...register("slug", {
						required: true,
					})}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/> */}

			{/* </section> */}

			<section>
				<Avatar className="rounded-sm text-white size-32 mb-2">
					<AvatarImage
						className="object-cover object-top"
						src={
							userData?.avatarUrl ??
							getDefaultAvatarUrl(userData?.fullName ?? "John Doe")
						}
						alt={"Avatar of User"}
					/>
					<AvatarFallback className="rounded-sm">JD</AvatarFallback>
				</Avatar>

				<ControlledInput
					control={control}
					errors={errors}
					name="avatar"
					type="file"		
					className="hover:cursor-pointer file:hover:cursor-pointer text-sm"
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
