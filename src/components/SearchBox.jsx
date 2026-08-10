import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/use-debounce";
import { Input } from "./ui/input";

function SearchBox({ onSearchChange }) {
	const [searchParams, setSearchParams] = useSearchParams({ search: "" });
	const input = searchParams.get("search");
	const debouncedValue = useDebounce(input, 750);

	useEffect(() => {
		if (debouncedValue) {
			onSearchChange?.(debouncedValue);
		}
	}, [debouncedValue, onSearchChange]);

	// [
	//         {
	//             "_id": "68e28009db64b23249445e0e",
	//             "title": "Next js for beginners",
	//             "slug": "next-js-for-beginners",
	//             "body": "<p>Next js for beginners</p>",
	//             "author": "68b51c7be5632f1b577f7baa",
	//             "coverImageUrl": "http://res.cloudinary.com/dfjk5z5ul/image/upload/v1759674388/coverImage-1759674377957-68b51c7be5632f1b577f7baa_zorus6.png"
	//         },
	//         {
	//             "_id": "68e27fd5db64b23249445e04",
	//             "title": "The fundamentals of react js",
	//             "slug": "the-fundamentals-of-react",
	//             "body": "<p>The fundamental of react js</p>",
	//             "author": "68b51c7be5632f1b577f7baa",
	//             "coverImageUrl": "http://res.cloudinary.com/dfjk5z5ul/image/upload/v1759674335/coverImage-1759674325394-68b51c7be5632f1b577f7baa_d5ekkt.png"
	//         }
	//     ]

	return (
		<div className="mt-2 flex w-full items-center rounded-md border border-border bg-transparent pl-3 focus:outline-0 focus-within:ring-1 focus-within:ring-ring dark:border-neutral-800 dark:bg-neutral dark:ring-offset-neutral-950 dark:focus-within:ring-neutral-300 shadow-sm dark:text-white">
			<SearchIcon className="size-6 stroke-neutral-500" />
			<Input
				value={input}
				onChange={(e) =>
					setSearchParams(
						{
							search: e.target.value,
						},
						{ replace: true },
					)
				}
				placeholder="Search"
				className="border-none focus-visible:ring-0"
			/>
		</div>
	);
}

export default SearchBox;
