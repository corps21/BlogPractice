import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postService } from "@/microservice/postService";
import {
	Button,
	ImagePreview,
	Input,
	RTE,
	SelectWrapper,
} from "../components/index";
import storageService from "../microservice/storageService";
import { Toaster } from "./ui/sonner";

function PostForm({ post }) {
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		reset({
			title: post?.title || "",
			slug: post?.$id || "",
			editor: post?.content || "",
			img: post?.featuredImage || "",
			status: post?.status || "active",
		});
	}, [reset, post]);

	const navigate = useNavigate();

	const submitHandler = ({ title, slug, editor, status, img }) => {
		toastPromiseWrapper(async (resolve, reject) => {
			if (post) {
				const updatePost = async ({ title, editor, status }) => {
					// get post id using react query
					const postId;
					const isPublic = status === "active"
					const updateResponse = await postService.updatePost({ id: postId, title, body: editor, isPublic });
					if (!updateResponse.success) reject(updateResponse?.message)

					if (img) {
						const coverImage = img[0]
						const updateCoverImageResponse = await postService.updateCoverImage({ id: postId, coverImage })
						if (!updateCoverImageResponse.success) reject(updateCoverImageResponse?.message)
					}

					resolve()
					navigate(`/post/${slug}`)

				}

				await updatePost({title, editor, status})
			} else {
				const createPost = async ({ title, slug, editor, status, img }) => {
					const isPublic = status === "active"
					const postResponse = await postService.createPost({ title, slug, body: editor, isPublic })
					if (!postResponse.success) reject(postResponse?.message)

					if (img) {
						const coverImage = img[0]
						const updateCoverImageResponse = await postService.updateCoverImage({ id: postResponse?.data?.post._id, coverImage })
						if (!updateCoverImageResponse.success) reject(updateCoverImageResponse?.message)
					}

					resolve()
					navigate(`/post/${slug}`)
				}
				await createPost({ title, slug, editor, status, img })
			}

		}, toastOptions);
	};
	const toastOptions = {
		loading: `${post ? "Updating the post" : "Creating the post"}`,
		success: `${post ? "Successfully updated the post" : "Successfully created the post"}`,
		error: (err) => `Something went wrong ( ${err} )`,
		richColors: true,
	};

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
			onSubmit={handleSubmit(submitHandler)}
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
				{post && post.featuredImage !== "" && (
					<ImagePreview
						src={storageService.getImagePreview(post.featuredImage).href}
					/>
				)}

				<Input
					errors={errors}
					registerId={"img"}
					label="Featured Image"
					type="file"
					{...register("img")}
					className="hover:cursor-pointer file:hover:cursor-pointer text-sm"
				/>

				<SelectWrapper
					autoFocus={getValues("status")}
					label="Post Status"
					{...register("status")}
					defaultValue={post?.status || "active"}
				/>

				<Button
					type="submit"
					text={post ? "Edit" : "Submit"}
					className="w-full text-base px-3 py-2 rounded-[6px] font-medium mt-4"
				/>
				<Toaster richColors theme="light" />
			</section>
		</form>
	);
}

export default PostForm;
