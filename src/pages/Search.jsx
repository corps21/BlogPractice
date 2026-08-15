import { CustomSearchBox } from "@/components/custom/CustomSearchBox";
import { postService } from "@/service/postService";
import {PostList} from "../components";
import { useState } from "react";

const onSuggestionsHandler = async (data) => {
	const res = (await postService.suggestSearchPost(data)).data?.suggestions ?? []
	console.log(res)
	return res
};

// Add tanstack query;
export default function Search() {
	const [result, setResult] = useState([]);

	const onSearchHandler = async (data) => {
		const res = await postService.searchPosts(data);
		setResult(res.data?.posts ?? [])
		console.log(res)
	};

	return (
		<section className="pb-10">
			<CustomSearchBox onSearch={onSearchHandler} onSuggestions={onSuggestionsHandler} />
			<PostList isLoading={false} files={result} className="mt-6"/>
		</section>
	);
}
