/* eslint-disable react/prop-types */

import { LogInIcon, VenetianMaskIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "@/store/userSlice";
import { Button } from "./ui/button";
import { userService } from "@/service/userService";
import { addAccessToken } from "@/store/authSlice";
import { toastPromiseWrapper } from "@/lib/utils";
import useAuthHomeRedirect from "@/hooks/useAuthHomeRedirect";

export default function CTA({ text = "To See Posts" }) {
	const dispatch = useDispatch();

	const handleAnonLogin = () => {
		toastPromiseWrapper(async (resolve, reject) => {
			const result = await userService.registerAnonUser();
			if (result.success) {
				dispatch(login({ userData: result?.data?.user }));
				dispatch(addAccessToken(result?.data?.accessToken));
				resolve();
			} else {
				reject(result?.message);
			}
		}, toastOptions);
	};

	const toastOptions = {
		loading: "Logging into your account",
		success: `Succesfully Logged in`,
		error: (err) => `Something went wrong ( ${err} )`,
		richColors: true,
	};

	useAuthHomeRedirect();

	return (
		<>
			<div className=" text-center text-4xl font-bold uppercase leading-[1.125] mb-4 dark:text-white">
				<div>Sign Up</div>
				<div>{text}</div>
			</div>
			<Button asChild className="rounded-[4px] bg-blue-700 mb-2">
				<Link to="/login">
					<LogInIcon />
					Sign In
				</Link>
			</Button>
			<Button
				asChild
				variant="secondary"
				onClick={handleAnonLogin}
			>
				<Link className="cursor-pointer hover:underline text-sm font-medium text-neutral-500">
					<VenetianMaskIcon />
					Use Without Signing In
				</Link>
			</Button>
		</>
	);
}
