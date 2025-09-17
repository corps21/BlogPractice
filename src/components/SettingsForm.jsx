import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/microservice/userService";
import { Button, Input } from ".";

export default function SettingsForm() {
	const userData = useSelector((state) => state.user.userData);

	const {
		register,
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

	const toastOptions = {
		loading: "Uploading the avatar",
		success: `Succesfully updated the avatar`,
		error: (err) => `Something went wrong ( ${err} )`,
		richColors: true,
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
							userData?.avatarUrl ||
							"https://testingbot.com/free-online-tools/random-avatar/900"
						}
						alt={"Avatar of User"}
					/>
					<AvatarFallback className="rounded-sm">JD</AvatarFallback>
				</Avatar>

				<Input
					errors={errors}
					registerId={"avatar"}
					label="Featured Image"
					type="file"
					{...register("avatar")}
					className="hover:cursor-pointer file:hover:cursor-pointer text-sm"
				/>

				<Button
					type="submit"
					text={"Submit"}
					className="w-full text-base px-3 py-2 rounded-[6px] font-medium mt-4"
				/>
				<Toaster richColors theme="light" />
			</section>
		</form>
	);
}
