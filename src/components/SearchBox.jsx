import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/use-debounce";
import { Input } from "./ui/input";

function SearchBox({ onSearchChange }) {
	const [searchParams, setSearchParams] = useSearchParams({ search: "" });
	const input = searchParams.get("search");
	const debouncedValue = useDebounce(input);

	useEffect(() => {
		if (debouncedValue) {
			onSearchChange?.(debouncedValue);
		}
	}, [debouncedValue, onSearchChange]);

	return (
		<div className="mt-2 flex w-full items-center rounded-md border border-border bg-transparent pl-3 focus:outline-0 focus-within:ring-1 focus-within:ring-ring dark:border-neutral-800 dark:bg-neutral dark:ring-offset-neutral-950 dark:focus-within:ring-neutral-300 shadow-sm dark:text-white">
			<SearchIcon className="size-6 stroke-neutral-500" />

			<Input
				value={input}
				onChange={(e) =>
					setSearchParams({
						search: e.target.value,
					})
				}
				placeholder="Search"
				className="border-none focus-visible:ring-0"
			/>
		</div>
	);
}

export default SearchBox;
