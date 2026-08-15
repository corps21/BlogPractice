import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDefaultAvatarUrl, toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/service/userService";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/custom/ControlledInput";
import { useEffect } from "react";
import { setCurrentUser } from "@/store/userSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldError, FieldSet } from "@/components/ui/field";
import { EraserIcon} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { UpdateAvatarModal } from "@/components/UpdateAvatarModal";

const toastOptions = {
	loading: "Uploading the avatar",
	success: `Succesfully updated the avatar`,
	error: (err) => `Something went wrong ( ${err} )`,
	richColors: true,
};

function validateUserUpdateFields(data, userFirstName, userLastName) {
	const {firstName, lastName, email} = data;
	let fullName;

	if(!!firstName ^ !!lastName) {
		fullName = firstName ? `${firstName} ${userLastName}` : `${userFirstName} ${lastName}`;
	} else if(firstName && lastName) {
		fullName = `${firstName} ${lastName}`;
	}

	return {
		fullName,
		email
	};
}

function validatePasswordUpdateFields(data, setError) {
	const {oldPassword, newPassword, confirmNewPassword} = data;

	const checkIfPasswordsMatch = (newPassword, confirmNewPassword) => newPassword === confirmNewPassword;
	
	if(!oldPassword && !newPassword && !confirmNewPassword) {
		return {
			isValid: false,
			oldPassword,
			newPassword,
			confirmNewPassword
		}
	}

	let isValid = true;

		if(oldPassword) {
			if(!newPassword) {
				isValid = false;
				setError("newPassword", {
					type: "manual",
					message: "New password is required"
				});
			}

			if(!checkIfPasswordsMatch(newPassword, confirmNewPassword)) {
				isValid = false;
				setError("confirmNewPassword", {
					type: "manual",
					message: "Passwords do not match"
				});

				setError("newPassword", {
					type: "manual",
					message: "Passwords do not match"
				});
			}
		} else if(newPassword) {
			if(!oldPassword) {
				isValid = false;
				setError("oldPassword", {
					type: "manual",
					message: "Old password is required"
				});
			}

			if(!checkIfPasswordsMatch(newPassword, confirmNewPassword)) {
				isValid = false;
				setError("confirmNewPassword", {
					type: "manual",
					message: "Passwords do not match"
				});
			}
		}

	return {
		isValid,
		oldPassword,
		newPassword,
		confirmNewPassword
	}
}

export default function SettingsForm() {
	const userData = useSelector((state) => state?.user?.data);
	const dispatch = useDispatch();

	const [userFirstName, ...userRestName] = userData?.fullName?.split(" ") ?? [];
	const userLastName = userRestName.join(" ");

	const {
		control,
		formState: { errors, dirtyFields, isDirty},
		handleSubmit,
		setError,
		setValue,
		getValues,
		reset,
	} = useForm({
		defaultValues: {
			firstName: userFirstName ?? "",
			lastName: userLastName ?? "",
			email: userData?.email ?? "",
			userName: userData?.userName ?? "",
			avatar: userData?.avatarUrl ?? "",
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		}
	});

	const onSubmit = async (data) => {

		if(!isDirty) {
			return;
		}

		const dataToSubmit = {};
		const promises = []

		for(const [key, value] of Object.entries(dirtyFields)) {
			if(value) {
				dataToSubmit[key] = data[key];
			}
		}

		console.log(dataToSubmit)
		

		// update user details
		const {fullName, email} = validateUserUpdateFields(dataToSubmit, userFirstName, userLastName);
		if(fullName || email) {
			promises[0] = userService.updateUserDetails({fullName, email});
		}

		// update password
		const {isValid, oldPassword, newPassword, _confirmNewPassword} = validatePasswordUpdateFields(dataToSubmit, setError);
		if(isValid) {
			promises[1] = userService.changeUserPassword({oldPassword, newPassword});
		}
		
		// update avatar
		if(dataToSubmit.avatar) {
			promises[2] = userService.updateAvatar({avatar: dataToSubmit.avatar[0]});
		}
		const [result1, result2, result3] = await Promise.all(promises);

		if(result2.message === "Invalid password") {
			setError("oldPassword", {
				type: "manual",
				message: "Invalid or expired password"
			});
		}
		console.log(await Promise.all(promises))

		// dispatch(setCurrentUser());
	};

	useEffect(() => {
		console.log("errors", errors)
	},[errors])

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
		<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
			<Card className="w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto">
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
									rules={{ required: "First Name is required" }}
									className={cn(
										errors.firstName && "border-red-500 focus:border-red-500 focus:ring-red-500",
									)}
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
							<FieldLabel htmlFor="email">Email Address</FieldLabel>

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
							<FieldLabel htmlFor="userName">Username</FieldLabel>

							<ControlledInput
								control={control}
								name="userName"
								disabled={true}
							/>

						</Field>


						<Field>
							<div className="flex items-center justify-between">
								<FieldLabel htmlFor="oldPassword">
									Old Password
								</FieldLabel>
							</div>

							<ControlledInput
								control={control}
								name="oldPassword"
								rules={{ minLength: 8 }}
								className={cn(
									errors.oldPassword && "border-red-500 focus:border-red-500 focus:ring-red-500",
								)}
								placeholder="••••••••••••••••••••••••"
								type="password"
							/>

							{errors.oldPassword && <FieldError>{errors.oldPassword.message}</FieldError>}

						</Field>


						<FieldGroup className="flex flex-col gap-4 md:flex-row md:placeholder:">
							<Field>
								<FieldLabel htmlFor="newPassword">New Password</FieldLabel>

								<ControlledInput
									control={control}
									name="newPassword"
									type="password"
									placeholder="••••••••••••••••••••••••"
									rules={{ minLength: {
										value: 8,
										message: "Password must be at least 8 characters"
									}}}
									className={cn(
										errors.newPassword && "border-red-500 focus:border-red-500 focus:ring-red-500",
									)}
								/>

								{errors.newPassword && <FieldError>{errors.newPassword.message}</FieldError>}
							</Field>

							<Field>
								<FieldLabel htmlFor="confirmNewPassword" className="overflow-hidden text-ellipsis">Confirm New Password</FieldLabel>

								<ControlledInput
									control={control}
									name="confirmNewPassword"
									type="password"
									placeholder="••••••••••••••••••••••••"
									rules={{ minLength: {
										value: 8,
										message: "Password must be at least 8 characters"
									} }}
									className={cn(
										errors.confirmNewPassword && "border-red-500 focus:border-red-500 focus:ring-red-500",
									)}
								/>

								{errors.confirmNewPassword && <FieldError>{errors.confirmNewPassword.message}</FieldError>}
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
