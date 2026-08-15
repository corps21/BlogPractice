import { useState, useEffect } from "react";
import useDebounce from "@/hooks/use-debounce";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function CustomSearchBox({onSearch, onSuggestions}) {
	const [query, setQuery] = useState("");
		const debouncedQuery = useDebounce(query, 500);
		const [suggestions, setSuggestions] = useState([]);
		const [selectedSuggestion, setSelectedSuggestion] = useState(true);
	
		const onKeyDownHandler = async (e) => {
			if(query.length === 0) {
				return;
			}

			if (e.key === "Enter") {
				if(selectedSuggestion || suggestions.length === 0 && query.length > 0) {
					setSuggestions([])
					setQuery("")
					onSearch({query})
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

			if (!selectedSuggestion && debouncedQuery) {
				getItems()
			}
		}, [debouncedQuery, selectedSuggestion, onSuggestions]);
	
		return (
			<article className="px-6 max-w-4xl mx-auto">
				<Command className="pb-2 h-auto">
					<CommandInput value={query} onValueChange={setQuery} placeholder="Search..." onKeyDown={(e) => {
						onKeyDownHandler(e);
						setSuggestions([]);
						setSelectedSuggestion(false);
					}} />

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
			</article>
		);
}
