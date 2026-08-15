import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDefaultAvatarUrl, toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/service/userService";
import { Button } from "@/components/ui/button";
import { CustomFileInput } from "@/components/custom/CustomFileInput";
import { ControlledInput } from "@/components/custom/ControlledInput";
import { useEffect } from "react";
import { setCurrentUser } from "@/store/userSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldError, FieldSet } from "@/components/ui/field";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ArrowRightIcon, UserPlusIcon, UserCircleIcon, CursorTextIcon, EraserIcon, Upload } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { UpdateAvatarModal } from "@/components/UpdateAvatarModal";

const toastOptions = {
	loading: "Uploading the avatar",
	success: `Succesfully updated the avatar`,
	error: (err) => `Something went wrong ( ${err} )`,
	richColors: true,
};

export default function SettingsForm() {
	const userData = useSelector((state) => state?.user?.data);
	const dispatch = useDispatch();

	const [firstName, lastName] = userData?.fullName?.split(" ") ?? [];

	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
		reset,
	} = useForm({
		defaultValues: {
			firstName: firstName ?? "",
			lastName: lastName ?? "",
			email: userData?.email ?? "",
			userName: userData?.userName ?? "",
			avatar: userData?.avatarUrl ?? "",
		}
	});

	// console.log(userData)

	const onSubmit = async (data) => {
		console.log(data)
		// reset({
		// 	avatar: avatar ?? "",
		// });
		handleUpdateAvatar(data.avatar[0]);
	};

	// useEffect(() => {
	// 	console.log(getValues("avatar"));
	// 	if (isSubmitSuccessful) {
	// 		reset({
	// 			avatar: avatar ?? "",
	// 		});
	// 	}
	// }, [isSubmitSuccessful,avatar, reset, getValues]);

	const handleUpdateAvatar = (avatar) => {
		console.log(avatar);
		toastPromiseWrapper(async (resolve, reject) => {
			const result = await userService.updateAvatar({ avatar });
			if (result.success) {
				dispatch(setCurrentUser());
				resolve();
			} else {
				reject(result?.message);
			}
		}, toastOptions);
	};

	return (
		<form onSubmit={handleSubmit((data) => console.log(data))} className="w-full flex flex-col items-center">
			<Card className="w-10/12 mx-auto">
				<CardHeader>
					<CardTitle>Update your account details</CardTitle>
					<CardDescription>
						Enter the information you’d like to update in your account.
					</CardDescription>
				</CardHeader>
				<CardContent>

					<FieldSet>

						<FieldGroup className="flex flex-row gap-4 items-center">
							<Avatar className="size-16 rounded-xl after:content-none border">
								<AvatarImage src={userData?.avatarUrl} alt={userData?.fullName ?? "John Doe"} className="rounded-none p-2" />
								<AvatarFallback className="rounded-xl">JD</AvatarFallback>
							</Avatar>

							<UpdateAvatarModal control={control} name="avatar" type="file" />
						</FieldGroup>

						<FieldGroup className="flex flex-row gap-4">
							<Field>
								<FieldLabel htmlFor="firstName">First Name</FieldLabel>

								<ControlledInput
									control={control}
									name="firstName"
									placeholder="John"
									type="text"
								/>

								{errors.firstName && <FieldError>{errors.firstName.message}</FieldError>}
							</Field>
							<Field>
								<FieldLabel htmlFor="lastName">Last Name</FieldLabel>

								<ControlledInput
									control={control}
									name="lastName"
									placeholder="Doe"
									type="text"
								/>

							</Field>
						</FieldGroup>


						<Field>
							<FieldLabel htmlFor="email-address">Email Address</FieldLabel>

							<ControlledInput
								control={control}
								name="email"
								rules={{ pattern: /^\S+@\S+$/i }}
								className={cn(
									errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
								)}
								placeholder="blog@sphere.com"
								type="email"
							/>

							{errors.email && <FieldError>{errors.email.message}</FieldError>}
						</Field>

						<Field>
							<FieldLabel htmlFor="user-name">Username</FieldLabel>

							<ControlledInput
								control={control}
								name="userName"
								disabled={true}
							/>

						</Field>


						<Field>
							<div className="flex items-center justify-between">
								<FieldLabel htmlFor="old-password">
									Old Password
								</FieldLabel>
							</div>

							<ControlledInput
								control={control}
								name="old-password"
								// rules={{ required: "Password is required", minLength: 8 }}
								// className={cn(
								// 	errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500",
								// )}
								placeholder="••••••••••••••••••••••••"
								type="password"
							/>

							{/* {errors.password && <FieldError>{errors.password.message}</FieldError>} */}

						</Field>


						<FieldGroup className="flex flex-col gap-4">
							<Field>
								<FieldLabel htmlFor="new-password">New Password</FieldLabel>

								<ControlledInput
									control={control}
									name="new-password"
									type="password"
									placeholder="••••••••••••••••••••••••"
								/>

								{/* {errors.firstName && <FieldError>{errors.firstName.message}</FieldError>} */}
							</Field>

							<Field>
								<FieldLabel htmlFor="confirm-new-password" className="overflow-hidden text-ellipsis">Confirm New Password</FieldLabel>

								<ControlledInput
									control={control}
									name="confirm-new-password"
									type="password"
									placeholder="••••••••••••••••••••••••"
								/>

							</Field>
						</FieldGroup>

					</FieldSet>
				</CardContent>
				<CardFooter className="flex-col gap-4">
					<Button type="submit" className="w-full py-5">
						< EraserIcon className="size-4" weight="bold" />
						Update Details
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
