import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userService } from "@/appwrite/userService";
import { Toaster } from "@/components/ui/sonner";
import { asyncHandler } from "@/lib/utils";
import authService from "../appwrite/authService";
import { Button, Container, Input } from "../components";
import { login, logout } from "../store/userSlice";

function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const status = useSelector((state) => state.auth.isLoggedIn);

	// 	if (status) {
	// 		const result = await authService.logout();
	// 		if (result) dispatch(logout());
	// 		else return new Response(false, "Error while removing active session");
	// 	}

	// 	const isAccountCreated = await authService.createAccount({
	// 		email,
	// 		password,
	// 		firstName,
	// 		lastName,
	// 	});

	// 	if (!isAccountCreated)
	// 		return new Response(false, "Error while creating account");

	// 	const isAccountLoggedIn = await authService.login({ email, password });
	// 	if (!isAccountLoggedIn)
	// 		return new Response(false, "Error while logging in");

	// 	const userData = await authService.getCurrentUser();
	// 	if (userData) {
	// 		dispatch(login(userData));
	// 		setTimeout(() => navigate("/"), 500);
	// 		return new Response(true, "Account created successfully");
	// 	} else return new Response(false, "Error while fetching user data");
	// };

	// const toastWrapper = async ({ email, password, firstName, lastName }) => {
	// 	const toastPromise = new Promise((resolve, reject) => {
	// 		createAccount({ email, password, firstName, lastName }).then(
	// 			({ isSuccess, message }) => {
	// 				if (isSuccess) resolve(message);
	// 				else reject(message);
	// 			},
	// 		);
	// 	});

	// 	toast.promise(toastPromise, {
	// 		loading: "Creating account...",
	// 		success: (message) => message,
	// 		error: (error) => error,
	// 		richColors: true,
	// 	});
	// };

	// TODO: Make a toastWrapper function
	const toastWrapper = ({ email, password, userName, firstName, lastName }) => {
		const toastPromise = new Promise(
			asyncHandler(async (resolve, reject) => {
				const result = await userService.registerUser({
					email,
					password,
					userName,
					fullName: `${firstName} ${lastName}`,
				});

				if (result.success) {
					resolve();
					// login user
					const toastPromise = new Promise(
						asyncHandler(async (resolve, reject) => {
							const result = await userService.loginUser({
								email,
								userName,
								password,
							});
							console.log(result);
							if (result.success) {
								resolve();
							} else {
								reject(result.data);
							}
						}),
					);

					toast.promise(toastPromise, {
						loading: "Logging into account...",
						success: () => `Logged into the account`,
						error: (err) => err,
						richColors: true,
					});
				} else {
					reject(result.data);
				}
			}),
		);
		toast.promise(toastPromise, {
			loading: "Creating account...",
			success: () => `Created the account`,
			error: (err) => err,
			richColors: true,
		});
	};

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
