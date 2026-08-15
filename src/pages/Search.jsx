import { CustomSearchBox } from "@/components/custom/CustomSearchBox";
import { postService } from "@/service/postService";
import {PostList} from "../components";
import { useState } from "react";
import { queryClient } from "@/query/query";
import { useSearchParams } from "react-router-dom";

const onSuggestionsHandler = async (data) => {
	const res = (await postService.suggestSearchPost(data)).data?.suggestions ?? []
	console.log(res)
	return res
};

export default function Search() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") ?? "";
	
	const [result, setResult] = useState(queryClient.getQueryData(["search", query]) ?? []);

	const onSearchHandler = async (data) => {
		const res = await queryClient.fetchQuery({
			queryKey: ["search", data?.query],
			queryFn: async () => {
				return (await postService.searchPosts(data)).data?.posts ?? []
			} 
		});

		setResult(res ?? [])
	};

	return (
		<section className="pb-10">
			<CustomSearchBox onSearch={onSearchHandler} onSuggestions={onSuggestionsHandler} />
			<PostList isLoading={false} files={result} className="mt-6"/>
		</section>
	);
}
