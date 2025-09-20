import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useToastMutation(
	{
		loadingText = "Loading...",
		successText = "Success",
		errorText = "Something went wrong",
	} = {},
	mutationOptions = {},
) {
	let toastId;

	const { onMutate, onSuccess, onError, onSettled, ...rest } = mutationOptions;

	return useMutation({
		...rest,

		onMutate: (...args) => {
			toastId = toast.loading(loadingText);
			onMutate?.(...args);
		},

		onSuccess: (...args) => {
			toast.dismiss(toastId);
			toast.success(successText);
			onSuccess?.(...args);
		},

		onError: (...args) => {
			toast.dismiss(toastId);
			toast.error(errorText);
			onError?.(...args);
		},

		onSettled: (...args) => {
			toast.dismiss(toastId);
			onSettled?.(...args);
		},
	});
}
