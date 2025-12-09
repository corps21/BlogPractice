import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

export default function useToastMutation(
	{
		loadingText = "Loading...",
		successText = "Success",
		errorText = "Something went wrong",
	} = {},
	mutationOptions = {},
) {
	const toastId = useRef(null);

	const { onMutate, onSuccess, onError, onSettled, ...rest } = mutationOptions;

	return useMutation({
		...rest,

		onMutate: (...args) => {
			toastId.current = toast.loading(loadingText);
			onMutate?.(...args);
		},

		onSuccess: (...args) => {
			toast.success(successText, {
				id: toastId.current
			});
			onSuccess?.(...args);
		},

		onError: (...args) => {
			toast.error(`${errorText} ( ${args[0].message} )`,{
				id: toastId.current
			});
			onError?.(...args);
		},

		onSettled: (...args) => {
			toast.dismiss(toastId);
			onSettled?.(...args);
		},
	});
}
