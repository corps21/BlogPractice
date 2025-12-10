import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToastMutation from "@/hooks/useToastMutation";
import { postService } from "@/microService/postService";
import { queryClient } from "@/query/query";
import { Button, ImagePreview, Input, RTE, SelectWrapper } from "../components";

function PostForm({ post }) {
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		formState: { errors, isDirty, dirtyFields },
	} = useForm({
		defaultValues: {
			title: post?.title ?? "",
			slug: post?.slug ?? "",
			editor: post?.body ?? "Welcome to BlogSphere",
			coverImageUrl: post?.coverImageUrl ?? "",
			status: post?.isPublic ? "active" : "inactive",
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
					const isPublic = status === "active";
					if (post) {
						console.log(isDirty, dirtyFields);
						if (isDirty) {
							const updateResponse = await postService.updatePost({
								slug,
								title: dirtyFields?.title ? title : null,
								body: dirtyFields?.editor ? editor : null,
								isPublic: dirtyFields?.status && isPublic,
							});
							if (!updateResponse.success)
								throw new Error(updateResponse.message);
							if (img && img.length > 0) {
								const coverImage = img[0];
								const updateCoverImageResponse =
									await postService.updateCoverImage({ slug, coverImage });
								if (!updateCoverImageResponse.success)
									throw new Error(updateCoverImageResponse.message);
								updateResponse.data.post.coverImageUrl =
									updateCoverImageResponse.data.url;
							}

							return updateResponse.data.post;
						} else {
							return post;
						}
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
					console.log(err);
					throw Error(err.message);
				}
			},
			onSuccess: (newPost) => {
				queryClient.setQueryData(["post", newPost.slug], newPost);
				navigate(`/posts/${newPost.slug}`);
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
		<form
			className="grid gap-8 md:max-w-6xl md:grid-cols-2 bg-card p-8 rounded-lg"
			onSubmit={handleSubmit(mutation.mutate)}
		>
			<section>
				<Input
					errors={errors}
					registerId="title"
					label="Title"
					{...register("title", {
						required: true,
					})}
				/>

				<Input
					errors={errors}
					registerId="slug"
					label="Slug"
					containerClass="mt-[1rem]"
					readOnly={post}
					{...register("slug", {
						required: true,
					})}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
				/>

				<RTE
					name="editor"
					control={control}
					label="Editor"
					defaultValue={getValues("editor")}
				/>
			</section>

			<section>
				{post && post.coverImageUrl !== "" && (
					<ImagePreview src={post.coverImageUrl} />
				)}

				{/* <Input
					errors={errors}
					registerId={"img"}
					label="Featured Image"
					type="file"
					{...register("img")}
					className="hover:cursor-pointer file:hover:cursor-pointer text-sm"
				/> */}

				{/* TODO: not being flagged as dirtyField even after touched by user */}

				<SelectWrapper
					label="Post Status"
					name="status"
					control={control}
					defaultValue={getValues("status")}
				/>

				<Button
					type="submit"
					text={post ? "Edit" : "Submit"}
					className="w-full text-base px-3 py-2 rounded-[6px] font-medium mt-4"
				/>
			</section>
		</form>
	);
}

export default PostForm;
