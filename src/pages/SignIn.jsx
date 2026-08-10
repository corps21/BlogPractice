import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useAuthHomeRedirect from "@/hooks/useAuthHomeRedirect";
import { toastPromiseWrapper } from "@/lib/utils";
import { userService } from "@/service/userService";
import { addAccessToken } from "@/store/authSlice";
import { Button } from "@/components/ui/button"
import { login } from "../store/userSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ArrowRightIcon, UserCirclePlusIcon, SignInIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ControlledInput } from "@/components/custom/ControlledInput";

const toastOptions = {
	loading: "Logging into your account",
	success: `Logged in`,
	error: (err) => `Something went wrong ( ${err} )`,
	richColors: true,
};

function SignIn() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const handleUserLogin = ({ email, password }) => {
		toastPromiseWrapper(async (resolve, reject) => {
			const result = await userService.loginUser({ email, password });

			if (result.success) {
				dispatch(login({ userData: result.data.user }));
				dispatch(addAccessToken(result.data.accessToken));
				resolve();
			} else {
				reject(result?.message);
			}

		}, toastOptions);
	};


	useAuthHomeRedirect();

	return (
		<form onSubmit={handleSubmit(handleUserLogin)} className="w-full flex flex-col items-center">
			<Card className="w-11/12 mx-auto my-18 md:w-6/12 md:my-40 lg:w-9/24 xl:w-6/24">
				<CardHeader className="mb-1.5">
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email and password to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FieldGroup>
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
							<div className="flex items-center justify-between">
								<FieldLabel htmlFor="current-password">
									Password
								</FieldLabel>
								<Link
									className="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
								>
									Forgot?
								</Link>
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
					</FieldGroup>
				</CardContent>
				<CardFooter className="flex-col gap-4">
					<Button type="submit" className="w-full py-5">
						<SignInIcon className="size-4" strokeWidth={2} />
						Log in
					</Button>
					<Item variant="muted" asChild>
						<Link to="/register">
							<ItemMedia variant="icon">
								<UserCirclePlusIcon strokeWidth={2} />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Sign up</ItemTitle>
								<ItemDescription className="line-clamp-1">
									Create a new account
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

export default SignIn;
