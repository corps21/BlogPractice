import { Toaster } from "sonner";
import { Container, Header, SearchBox } from "@/components";
import { useState } from "react";
import useToastQuery from "@/hooks/useToastQuery";
import { postService } from "@/microService/postService";

export default function Search() {
	const [query, setQuery] = useState("");

	const {isLoading,data} = useToastQuery({
		enabled: !!query,
		queryKey: ["search", query],
		queryFn: () => postService.searchPosts({query})
	});

	return (
		<Container className="flex flex-col items-center">
			<Header pageTitle="Search" />
			<SearchBox onSearchChange={(val) => setQuery(val)} />
			<Toaster />
		</Container>
	);
}
