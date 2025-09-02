import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userService } from "@/microService/userService";
import { Toaster } from "@/components/ui/sonner";
import { toastPromiseWrapper } from "@/lib/utils";
import { Button, Container, Input } from "../components";
import { login } from "../store/userSlice";
import useAuthHomeRedirect from "@/hooks/useAuthHomeRedirect";
import { addAccessToken } from "@/store/authSlice";

function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const handleUserLogin = ({ email, password }) => {
		toastPromiseWrapper(async (resolve, reject) => {
			const result = await userService.loginUser({ email, password });
			if (result.success) {
				dispatch(addAccessToken(result.data.accessToken))
				dispatch(login({ userData: result.data.user }))
				resolve()
			} else {
				reject(result?.message)
			}
		}, toastOptions);
	};

	const toastOptions = {
		loading: "Logging into your account",
		success: `Succesfully Logged in`,
		error: (err) => `Something went wrong ( ${err} )`,
		richColors: true,
	};

	useAuthHomeRedirect()

	return (
		<section className="my-[3rem] md:my-auto">
			<Container className="border-[1px] border-border p-8 rounded-xl md:w-[28rem] shadow-md">
				<div className="mb-6 dark:text-white space-y-2">
					<h2 className={"text-xl font-bold"}>Login</h2>
					<h3 className="text-sm text-muted-foreground">
						Enter your email to login to your account
					</h3>
				</div>

				<form
					onSubmit={handleSubmit(handleUserLogin)}
					className="flex flex-col gap-4"
				>
					<Input
						label="Email"
						errors={errors}
						registerId="email"
						placeholder="Enter your mail"
						{...register("email", {
							required: true,
							validate: {
								matchPattern: (value) =>
									/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
									"Email address must be a valid address",
							},
						})}
						className="text-sm"
					/>
					<Input
						errors={errors}
						registerId="password"
						label="Password"
						type="password"
						placeholder="Enter your password"
						{...register("password", { required: true, minLength: 8 })}
						className="text-sm"
					/>
					<Button
						type="submit"
						className="block text-sm px-3 py-2 rounded-[6px] mt-2 font-medium "
						text="Login"
					/>
					<Link className="cursor-pointer text-center underline text-sm text-muted-foreground">
						Forgot your password?
					</Link>
					<div className="text-center text-muted-foreground text-sm">
						Don&apos;t have an account?{" "}
						<span className="hover:underline hover:text-neutral-600 hover:font-medium">
							<Link to="/signup" className="underline font-semibold">
								Sign up
							</Link>
						</span>
					</div>
				</form>
			</Container>
			<Toaster richColors />
		</section>
	);
}

export default SignIn;
