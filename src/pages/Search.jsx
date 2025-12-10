import { useState } from "react";
import { Container, Header, SearchBox, SearchResultCard } from "@/components";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/microService/postService";

export default function Search() {
	const [query, setQuery] = useState("");

	const { isLoading, data } = useToastQuery({
		enabled: !!query,
		queryKey: ["search", query],
		queryFn: () => postService.searchPosts({ query }),
	});

	return (
		<Container className="flex flex-col items-center">
			<Header pageTitle="Search" />
			<SearchBox onSearchChange={(val) => setQuery(val)} />
			<div className="mt-12 flex flex-col gap-2">
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
				<SearchResultCard></SearchResultCard>
			</div>
		</Container>
	);
}
