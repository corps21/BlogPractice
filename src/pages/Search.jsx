import { useState, useEffect} from "react";
import useDebounce from "@/hooks/use-debounce";
import { SearchBox, SearchResultCard } from "@/components";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

export default function Search() {
	const [query, setQuery] = useState("");
	const deboundedQuery = useDebounce(query, 500);
	const [suggestions, setSuggestions] = useState([]);
	// const { isLoading, data } = useToastQuery({
	// 	enabled: !!query,
	// 	queryKey: ["search", query],
	// 	queryFn: () => postService.searchPosts({ query }),
	// });



	const [loading, setLoading] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {
		async function getItems() {
			setLoading(true)
			const res = (await postService.suggestSearchPost({ query: deboundedQuery })).data?.suggestions ?? []
			console.log(res)
			setItems(res)
			setLoading(false)
		}

		getItems()
	}, [deboundedQuery])

	return (
		<>
			{/* <SearchBox onSearchChange={(val) => setQuery(val)} /> */}

			{/* <div className="mt-12 flex flex-col gap-2">
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
			</div>  */}

			<Command>
				<CommandInput value={query} onValueChange={setQuery} placeholder="Search..." />
				<CommandList>
					{/* {loading && <CommandLoading>Fetching words…</CommandLoading>} */}
					{items.map((item) => {
						return (
							<CommandItem key={`word-${item}`} value={item}>
								{item}
							</CommandItem>
						)
					})}
				</CommandList>
			</Command>
		</>
	);
}
