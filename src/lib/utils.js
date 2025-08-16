import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponse } from "./response";
import { toast } from "sonner";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function asyncHandler(fn) {
	return async (...params) => {
		return Promise.resolve(fn(...params)).catch((err) => {
			console.log(err);
		});
	};
}

export function toastPromiseWrapper(fn, options = {
	loading: "Loading...",
	success: `Succesfull`,
	error: "Something went wrong",
	richColors: true,
}) {
	const toastPromise = new Promise((resolve, reject) => {
		Promise.resolve(fn(resolve, reject));
	})
	toast.promise(toastPromise, options)
}

export function fetchWrapper(fn) {
	return async (...params) => {
		return Promise.resolve(fn(...params))
			.then((data) => {
				if (data.success) {
					return new ApiResponse(true, data.message, data?.data);
				} else {
					return new ApiResponse(false, data.message, data?.data);
				}
			})
			.catch((err) => {
				console.log(err);
				return new ApiResponse(false, err.message);
			});
	};
}
