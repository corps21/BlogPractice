import { useState, useEffect } from "react";
import useDebounce from "@/hooks/use-debounce";
import { postService } from "@/service/postService";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

// TODO: integrate the tan stack query
export function CustomSearchBox() {
	const [query, setQuery] = useState("");
		const deboundedQuery = useDebounce(query, 500);
		const [suggestions, setSuggestions] = useState([]);
		const [selectedSuggestion, setSelectedSuggestion] = useState(true);
	
		const onKeyDownHandler = async (e) => {
			if (e.key === "Enter") {
				if(selectedSuggestion || suggestions.length === 0 && query.length > 0) {
					const res = await postService.searchPosts({ query });
					console.log(res)
				}
			}
		}
	
		useEffect(() => {
			async function getItems() {
				const res = (await postService.suggestSearchPost({ query: deboundedQuery })).data?.suggestions ?? []
				setSuggestions(res)
				console.log(res)
			}
			if (!selectedSuggestion) {
				getItems()
			}
		}, [deboundedQuery, selectedSuggestion])
	
		return (
			<>
				<Command className="pb-2">
					<CommandInput value={query} onValueChange={setQuery} placeholder="Search..." onKeyDown={(e) => {
						onKeyDownHandler(e);
						setSelectedSuggestion(false);
					}} />
	
					{query.length > 0 && suggestions.length === 0 && (
						<CommandEmpty className="p-2 pt-4 ">No suggestions found</CommandEmpty>
					)}
	
					{
						suggestions.length > 0 && (
							<CommandGroup heading="Suggestions">
								<CommandList>
									{suggestions.map((item) => {
										return (
											<CommandItem key={`word-${item}`} value={item} onSelect={() => {
												setQuery(item)
												setSelectedSuggestion(true)
											}}>
												{item}
											</CommandItem>
										)
									})}
								</CommandList>
							</CommandGroup>
						)
					}
				</Command>
			</>
		);
}
