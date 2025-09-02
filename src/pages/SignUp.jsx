import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userService } from "@/microService/userService";
import { Toaster } from "@/components/ui/sonner";
import { toastPromiseWrapper } from "@/lib/utils";
import { Button, Container, Input } from "../components";
import { login } from "../store/userSlice";
import useAuthHomeRedirect from "@/hooks/useAuthHomeRedirect";

function SignUp() {
	const {
		register,
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
				fullName: `${firstName} ${lastName}`,
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
		error: (err) => `Something went wrong ( ${err} )`,
	};

	useAuthHomeRedirect()

	return (
		<section className="flex justify-center items-center my-[3rem] md:my-auto">
			<Container className="border-[1px] border-border p-10 rounded-xl md:w-[28rem] shadow-md">
				<div className="mb-6 dark:text-white space-y-2">
					<h2 className="text-xl font-bold">Create your account</h2>
					<h3 className="text-sm text-muted-foreground ">
						Fill in your details to create your account.
					</h3>
				</div>

				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(toastWrapper)}
				>
					<div className=" grid grid-cols-2 gap-4">
						<Input
							errors={errors}
							registerId="firstName"
							placeholder="First Name"
							label="First Name"
							{...register("firstName", { required: true })}
							className="text-sm"
						/>
						<Input
							errors={errors}
							registerId="lastName"
							placeholder="Last Name"
							label="Last Name"
							{...register("lastName", { required: true })}
							className="text-sm"
						/>
					</div>

					<Input
						errors={errors}
						registerId="email"
						placeholder="Enter your mail"
						label="Email"
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
						registerId="userName"
						placeholder="Enter your username"
						label="Username"
						{...register("userName", {
							required: true,
						})}
						className="text-sm"
					/>

					<Input
						errors={errors}
						registerId="password"
						placeholder="Enter your password"
						label="Password"
						type="password"
						{...register("password", { required: true, minLength: 8 })}
						className="text-sm"
					/>

					<Button
						type="submit"
						className="block text-base px-3 py-2 rounded-[6px] mt-2 font-medium"
						text="Sign up"
					/>

					<Toaster richColors theme="light" />

					<div className="text-center text-muted-foreground text-sm">
						Already have an account? <br />
						<span className="hover:underline">
							<Link to="/signin" className="underline font-semibold">
								Sign in
							</Link>
						</span>
					</div>
				</form>
			</Container>
		</section>
	);
}

export default SignUp;
