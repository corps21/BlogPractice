import { useState } from "react";
import { SearchBox, SearchResultCard } from "@/components";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command";

export default function Search() {
	// const [query, setQuery] = useState("");

	// const { isLoading, data } = useToastQuery({
	// 	enabled: !!query,
	// 	queryKey: ["search", query],
	// 	queryFn: () => postService.searchPosts({ query }),
	// });

	return (
		<>
			{/* <SearchBox onSearchChange={(val) => setQuery(val)} /> */}

			{/* <div className="mt-12 flex flex-col gap-2">
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
			</div>  */}

			<Command>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>Profile</CommandItem>
						<CommandItem>Billing</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</>
	);
}
