import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useToastQuery({
	successMessage,
	errorMessage,
	...queryOptions
}) {
	const query = useQuery({
		...queryOptions,
	});

	useEffect(() => {
		if (query.isSuccess && successMessage) {
			toast.success(successMessage);
		} else if (query.isError) {
			toast.error(
				errorMessage ?? `Something went wrong ${query.error.message}`,
			);
		}
	}, [
		errorMessage,
		successMessage,
		query.isSuccess,
		query.isError,
		query.error,
	]);

	return { ...query, data: query.data?.data };
}
