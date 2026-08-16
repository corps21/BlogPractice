import { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToastMutation from "@/hooks/useToastMutation";
import { postService } from "@/service/postService";
import { queryClient } from "@/query/query";
import { SimpleEditor } from '@/components/ui/tiptap-templates/simple/simple-editor'

function PostForm({ post }) {
	const {
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		formState: { errors, dirtyFields },
	} = useForm({
		defaultValues: {
			title: post?.title ?? "",
			slug: post?.slug ?? "",
			editor: post?.body ?? "<h1 style=\"text-align: center;\">Welcome to BlogSphere</h1>",
			coverImageUrl: post?.coverImageUrl ?? "",
			status: post?.isPublic ? "public" : "private"
		},
	});

	const navigate = useNavigate();

	const mutation = useToastMutation(
		{
			loadingText: `${post ? "Updating the post" : "Creating the post"}`,
			successText: `${post ? "Successfully updated the post" : "Successfully created the post"}`,
		},
		{
			mutationKey: ["post", "update"],
			mutationFn: async ({ title, slug, editor, status, img }) => {
				try {
					const isPublic = status === "public";
					if (post) {
						let newPost = post;
						if (
							dirtyFields?.title ||
							dirtyFields?.status ||
							dirtyFields?.editor
						) {
							const updateResponse = await postService.updatePost({
								slug,
								title: dirtyFields?.title ? title : null,
								body: dirtyFields?.editor ? editor : null,
								isPublic: dirtyFields?.status && isPublic,
							});
							if (!updateResponse.success)
								throw new Error(updateResponse.message);
							newPost = updateResponse.data.post;
						}
						if (img && img.length > 0) {
							const coverImage = img[0];
							const updateCoverImageResponse =
								await postService.updateCoverImage({ slug, coverImage });
							if (!updateCoverImageResponse.success)
								throw new Error(updateCoverImageResponse.message);
							newPost.coverImageUrl = updateCoverImageResponse.data.url;
						}
						return newPost;
					} else {
						const postResponse = await postService.createPost({
							title,
							slug,
							body: editor,
							isPublic,
						});

						if (!postResponse.success) throw new Error(postResponse.message);

						if (img && img.length > 0) {
							const coverImage = img[0];
							const updateCoverImageResponse =
								await postService.updateCoverImage({ slug, coverImage });
							if (!updateCoverImageResponse.success)
								throw new Error(updateCoverImageResponse.message);

							postResponse.data.post.coverImageUrl =
								updateCoverImageResponse.data.url;
						}

						return postResponse.data.post;
					}
				} catch (err) {
					// console.log(err);
					throw Error(err.message);
				}
			},
			onSuccess: (newPost) => {
				queryClient.setQueryData(["posts", newPost.slug], newPost);
				if(newPost.isPublic) navigate(`/posts/${newPost.slug}`);
				else navigate(`/posts/${newPost.slug}/private`);
			},
		},
	);

	const slugTransform = useCallback((val) => {
		return val
			.trim()
			.toLowerCase()
			.replace(/[^a-zA-Z\d\s]+/g, "-")
			.replace(/\s/g, "-");
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title" && !post)
				setValue("slug", slugTransform(value.title), { shouldValidate: true });
		});

		return () => subscription.unsubscribe();
	}, [setValue, slugTransform, watch, post]);

	return (

		<>
			<Controller
				control={control}
				name="editor"
				render={({ field: { onChange, value } }) => (
					<SimpleEditor
						control={control}
						errors={errors}
						post={post}
						setValue={setValue}
						getValues={getValues}
						slugTransform={slugTransform}
						onChange={onChange}
						value={value}
						handleSubmit={handleSubmit}
						onSubmitHandler={mutation.mutate}
					/>
				)}
			/>
		</>
	);
}

export default PostForm;
