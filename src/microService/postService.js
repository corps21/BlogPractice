import api from "@/api/api";
import { axiosWrapper } from "@/lib/utils";

class PostService {
	createPost = axiosWrapper(async ({ title, slug, body, isPublic }) => {
		return api.post("/post", { title, slug, body, isPublic });
	});

	updatePost = axiosWrapper(async ({ slug, title, body, isPublic }) => {
		return api.put(`/post/${slug}`, { title, body, isPublic });
	});

	updateCoverImage = axiosWrapper(async ({ slug, coverImage }) => {
		const formData = new FormData();
		formData.append("coverImage", coverImage);
		return api.patch(`/post/${slug}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	});

	searchPosts = axiosWrapper(async ({ query }) => {
		return api.get("/post/", {
			params: {
				search: query,
			},
		});
	});

	getPublicPosts = axiosWrapper(async () => {
		return api.get("/post/public");
	});

	getPostBySlug = axiosWrapper(async ({slug}) => {
		return api.get(`/post/${slug}`)
	})
}

export const postService = new PostService();
