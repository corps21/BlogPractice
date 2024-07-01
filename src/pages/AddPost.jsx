import { Input, Button, Container, Select, RTE } from "../components/index";
import { useForm } from "react-hook-form";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useId, useState } from "react";

function AddPost() {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    title: "",
    slug: "",
    content: "",
    img: "",
    status: "",
  });
  const userId = useSelector((state) => state.auth.userData.$id);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const slugTransform = useCallback((val) => {
    return val
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  },[]);

  useEffect(() => {
   const subscription = watch((value,{name}) => {
      if(name === "title") setValue('slug', slugTransform(value.title), {shouldValidate:true})
   })

   return () => subscription.unsubscribe();
  },[watch,setValue,slugTransform])

  return (
    <Container className="border-2 rounded-lg p-5">
      <form
        className="flex"
        onSubmit={handleSubmit(async (data) => {
          setIsSuccess(false);
          setMessage("");

          try {
            const imgData =
              data.img.length > 0
                ? await storageService.uploadImage(data.img[0])
                : null;

            const result = await databaseService.createPost({
              title: data.title,
              slug: data.slug,
              content: data.editor,
              status: data.status,
              featuredImage: imgData?.$id || "",
              userId: userId,
            });

            setIsSuccess(true);
            setMessage("Post Created Successfully")
            
            console.log(message, isSuccess)
            
          } catch (error) {
            setMessage("Something went Wrong" + error.message);
            console.log(error);
          }
        })}
      >
        <div className="w-[50%] p-[2rem] py-[4rem] border-r-2">
          <Input
            label="Title"
            {...register("title", {
              required: true,
            })}
          />

          <Input
            label="Slug"
            containerClass="mt-[1rem]"
            
            {...register("slug", {
              required: true,
            })}

            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
          />

          <RTE
            name="editor"
            control={control}
            label="Editor"
            defaultValue="Welcome to BlogSphere!"
          />
        </div>

        <div className="w-[50%] px-[8rem] py-[4rem]">
          <Input label="Featured Image" type="file" {...register("img")} />
          <Select
            label="Post Status"
            {...register("status", {
              required: true,
            })}
          />

          <Button type="submit" text="Submit" className="w-full" />
        </div>
      </form>
    </Container>
  );
}

export default AddPost;
