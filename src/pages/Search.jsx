import { useState } from "react";
import { SearchBox, SearchResultCard } from "@/components";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/service/postService";

export default function Search() {
	const [query, setQuery] = useState("");

	const { isLoading, data } = useToastQuery({
		enabled: !!query,
		queryKey: ["search", query],
		queryFn: () => postService.searchPosts({ query }),
	});

	return (
		<>
			<SearchBox onSearchChange={(val) => setQuery(val)} />
			<div className="mt-12 flex flex-col gap-2">
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
			</div>
		</>
	);
}
