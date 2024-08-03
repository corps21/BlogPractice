/* eslint-disable react/prop-types */

import { Input, Button, Select, RTE , ImagePreview} from "../components/index";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {

  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        editor: post?.content || "",
        img: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userData?.$id);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const clickHandler = async (data) => {
    try {
      // const imgData =
      //   data.img.length > 0
      //     ? (await storageService.uploadImage(data.img[0])) ||
      //     setMessage("Something went wrong")
      //     : null;

      // const result = post ? await databaseService.updatePost(
      //   {
      //     title: data.title,
      //     content: data.editor,
      //     status: data.status,
      //     featuredImage: imgData?.$id || data.featuredImage,
      //   }, data.slug
      // ) :
      //   await databaseService.createPost(
      //     {
      //       title: data.title,
      //       slug: data.slug,
      //       content: data.editor,
      //       status: data.status,
      //       featuredImage: imgData?.$id || "",
      //       userId: userId,
      //     }
      //   );

      let imgData = { $id: data.featuredImage };
      let postResult = null;

      if (data.img.length > 0) {
        try {
          const imageResult = await storageService.uploadImage(data.img[0])
          if (imageResult) imgData = imageResult;
        } catch (error) {
          setMessage("Something went wrong")
          console.log(error);
        }
      }

      if (post) {
        try {
          const updateResult = await databaseService.updatePost(
            {
              title: data.title,
              content: data.editor,
              status: data.status,
              featuredImage: imgData.$id,
            }, data.slug
          )
          if (updateResult) postResult = updateResult
        }

        catch (error) {
          setMessage("Something went wrong");
          console.log(error);
        }
      }
      else {
        try {
          const createResult = await databaseService.createPost(
            {
              title: data.title,
              slug: data.slug,
              content: data.editor,
              status: data.status,
              featuredImage: imgData?.$id || "",
              userId: userId
            }
          )
          if (createResult) postResult = createResult
        }

        catch (error) {
          setMessage("Something went wrong");
          console.log(error);
        }
      }

      if (postResult) {
        setIsSuccess(true);
        post ? setMessage("Post Updated Successfully") : setMessage("Post Created Successfully")
        setTimeout(() => navigate(`/post/${data.slug}`), 500);
      }

      else {
        setMessage("Something went wrong");
      }

    }

    catch (error) {
      console.log(error);
    }
  }

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
      className="space-y-[2rem]"
      onSubmit={handleSubmit(clickHandler)}
    >
      <div className="">
        <Input
          label="Title"
          {...register("title", {
            required: true,
          })}
        />

        <Input
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
      </div>

      <div className="">
        {post && post.featuredImage !== "" && <ImagePreview src={storageService.getImagePreview(post.featuredImage).href}/>}
        <Input label="Featured Image" type="file" {...register("img")} />
        <Select
          autoFocus={getValues("status")}
          label="Post Status"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          text={post ? "Edit" : "Submit"}
          className="w-full"
        />
        <div
          className={`w-full text-center text-xl mt-[2rem] ${isSuccess ? "text-green-600" : "text-red-600"
            }`}
        >
          {message}
        </div>
      </div>
    </form>
  );
}

export default PostForm;
