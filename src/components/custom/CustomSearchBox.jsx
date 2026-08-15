import { useState, useEffect } from "react";
import useDebounce from "@/hooks/use-debounce";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useSearchParams } from "react-router-dom";

export function CustomSearchBox({onSearch, onSuggestions}) {

		const [searchParams, setSearchParams] = useSearchParams();
		const query = searchParams.get("q") ?? "";

		const debouncedQuery = useDebounce(query, 500);
		const [suggestions, setSuggestions] = useState([]);
		const [selectedSuggestion, setSelectedSuggestion] = useState(true);
		const [isSearched, setIsSearched] = useState(false);
	
		const onKeyDownHandler = async (e) => {
			if(query.length === 0) {
				return;
			}

			if (e.key === "Enter") {
				if(selectedSuggestion || suggestions.length === 0 && query.length > 0) {
					setSuggestions([])
					onSearch({query})
					setIsSearched(true)
				}
			}
		}
	
		useEffect(() => {
			if(!debouncedQuery) {
				setSuggestions([])
			}

			async function getItems() {
				const res = await onSuggestions({query: debouncedQuery})
				setSuggestions(res)
			}

			if (!selectedSuggestion && debouncedQuery && !isSearched) {
				getItems()
			}
		}, [debouncedQuery, selectedSuggestion, onSuggestions, isSearched]);
	
		return (
			<article className="px-6 max-w-4xl mx-auto">
				<Command className="pb-2 h-auto">
					<CommandInput value={query} onValueChange={(value) => setSearchParams({q: value})} placeholder="Search..." onKeyDown={(e) => {
						setIsSearched(false)
						onKeyDownHandler(e);
						setSelectedSuggestion(false);
					}} />

					{
						suggestions.length > 0 && (
							<CommandGroup heading="Suggestions">
								<CommandList>
									{suggestions.map((item) => {
										return (
											<CommandItem key={`word-${item}`} value={item} onSelect={() => {
												setSearchParams({q: item})
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
			</article>
		);
}
