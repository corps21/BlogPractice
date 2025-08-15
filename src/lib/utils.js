import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponse } from "./response";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function asyncHandler(fn) {
	return async (...params) => {
		return Promise.resolve(fn(...params)).catch((err) => {
			console.log(err);
		})
	}
}

export function fetchWrapper(fn) {
	return async (...params) => {
		return Promise.resolve(fn(...params))
		.then(data => {
			if(data.ok) {
				return new ApiResponse(true,data.data)
			} else {
				return new ApiResponse(false,data.message)
			}
		})
		.catch((err) => {
			console.log(err);
			return new ApiResponse(false,err.message)
		})
	}
}