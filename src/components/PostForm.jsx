/* eslint-disable react/prop-types */

import { Input, Button, RTE , ImagePreview, SelectWrapper} from "../components/index";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useSelector } from "react-redux";
import { useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Response } from "@/lib/response";

function PostForm({ post }) {

  const { register, handleSubmit, control, watch, setValue, getValues, formState: {errors},reset} = useForm();

    useEffect(() => {
      reset({
        title: post?.title || "",
        slug: post?.$id || "",
        editor: post?.content || "",
        img: post?.featuredImage || "",
        status: post?.status || "active",
      })
    },[reset,post])

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  const submitHandler = async (data) => {

    if(post) {
      // edit mode
      const {title,slug,editor:content,featuredImage,status} = data

      let image = featuredImage;
      
      if(data.img && typeof data.img === "object" && data.img.length > 0) {
        const imageStatus = await storageService.uploadImage(data.img[0]);
        if(imageStatus) {
          image = imageStatus.$id
          const isImageDeleted = await storageService.deleteImage(post.featuredImage);
          if(!isImageDeleted) return new Response(false,"Image Delete Failed")   
        } else {
          return new Response(false,"Image Upload Failed")
        }
      }

      const updateStatus = await databaseService.updatePost({
        title,
        content,
        featuredImage: image,
        status:status
      },slug)

      if(updateStatus) {
        setTimeout(() => navigate(`/post/${slug}`), 500);
        return new Response(true,"Post Updated Successfully")
      }
      return new Response(false,"Post Update Failed")
    } else {
      // create mode
      let image;
      const {$id:userId,name:authorName} = userData
      
      const imageStatus = await storageService.uploadImage(data.img[0]);
      if(imageStatus) image = imageStatus?.$id
      else return new Response(false,"Image Upload Failed")

      const {title,slug,editor:content,status} = data

      const createStatus = await databaseService.createPost({
        title,
        slug,
        content,
        featuredImage: image,
        status,
        userId,
        authorName
      })

      if(createStatus) {
        setTimeout(() => navigate(`/post/${slug}`), 500);
        return new Response(true,"Post Created Successfully")
      }
      else return new Response(false,"Post Creation Failed")
    }
  }

  const toastWrapper = (data) => {
    const toastPromise = new Promise((resolve, reject) => {
      submitHandler(data).then(({ isSuccess, message }) => {
        if (isSuccess) {
          resolve(message);
        } else {
          reject(message);
        }
      });
    })
    toast.promise(toastPromise, {
      loading: post ? "Updating..." : "Creating...",
      success: (message) => message,
      error: (error) => error,
      richColors:true
    })
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
      className="grid md:grid-cols-2 gap-8 md:max-w-6xl"
      onSubmit={handleSubmit(toastWrapper)}
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
        {post && post.featuredImage !== "" && <ImagePreview src={storageService.getImagePreview(post.featuredImage).href}/>}

        <Input errors={errors} registerId={"img"} label="Featured Image" type="file" {...register("img")} className="text-sm file:py-0 file:my-0" />

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
