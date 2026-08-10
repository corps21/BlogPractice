import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useAuthHomeRedirect from "@/hooks/useAuthHomeRedirect";
import { toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/service/userService";
import { addAccessToken } from "@/store/authSlice";
import { login } from "../store/userSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldError, FieldSet } from "@/components/ui/field";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ArrowRightIcon, UserPlusIcon, UserCircleIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ControlledInput } from "@/components/custom/ControlledInput";
import { Button } from "@/components/ui/button"


function SignUp() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const toastWrapper = ({ email, password, userName, firstName, lastName }) => {
		toastPromiseWrapper(async (resolve, reject) => {
			const result = await userService.registerUser({
				email,
				password,
				userName,
				fullName: `${firstName} ${lastName ?? ""}`,
			});
			if (result.success) {
				resolve();
				const result = await userService.loginUser({
					email,
					password,
					userName,
				});
				if (result.success) {
					dispatch(login({ userData: result.data.user }));
					dispatch(addAccessToken(result.data.accessToken));
					toast.success("Logged into the account");
				} else {
					toast.error("Something went wrong while logging into account");
				}
			} else {
				reject(result.message);
			}
		}, toastOptions);
	};

	const toastOptions = {
		loading: "Creating Account...",
		success: "Created account successfully",
		error: (err) => `${err || 'Something went wrong'}`,
	};

	useAuthHomeRedirect();

	return (
	<form onSubmit={handleSubmit(toastWrapper)} className="w-full flex flex-col items-center">
		<Card className="w-10/12 mx-auto my-18 md:w-7/12 md:my-40 lg:w-10/24 xl:w-7/24">
			<CardHeader>
				<CardTitle>Sign up to your account</CardTitle>
				<CardDescription>
					Enter your email and password to sign up to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FieldSet>
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
						<FieldLabel htmlFor="email-address">Email Address</FieldLabel>

						<ControlledInput
							control={control}
							name="email"
							rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
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
									rules={{ required: "Username is required" }}
									className={cn(
										errors.userName && "border-red-500 focus:border-red-500 focus:ring-red-500",
									)}
									placeholder="john72"
								/>

								{errors.userName && <FieldError>{errors.userName.message}</FieldError>}
							</Field>


					<Field>
						<div className="flex items-center justify-between">
							<FieldLabel htmlFor="current-password">
								Password
							</FieldLabel>
						</div>

						<ControlledInput
							control={control}
							name="password"
							rules={{ required: "Password is required", minLength: 8 }}
							className={cn(
								errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500",
							)}
							placeholder="••••••••••••••••••••••••"
							type="password"
						/>

						{errors.password && <FieldError>{errors.password.message}</FieldError>}

					</Field>
				</FieldSet>
			</CardContent>
			<CardFooter className="flex-col gap-4">
				<Button type="submit" className="w-full py-5">
					< UserPlusIcon className="size-4" strokeWidth={2} />
					Sign up
				</Button>
				<Item variant="muted" asChild>
					<Link to="/login">
						<ItemMedia variant="icon">
							<UserCircleIcon strokeWidth={2} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Login</ItemTitle>
							<ItemDescription className="line-clamp-1">
								Log in to your account
							</ItemDescription>
						</ItemContent>
						<ArrowRightIcon className="size-4" strokeWidth={2} />
					</Link>
				</Item>
			</CardFooter>
		</Card>
	</form>
	);
}

export default SignUp;
