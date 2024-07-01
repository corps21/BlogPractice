import { Input, Button, Container, Select, RTE } from "../components/index";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";
import { useRef, useState } from "react";
import databaseService from "../appwrite/databaseService";

function AddPost() {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const imgRef = useRef();

  const onSubmitHandler = ({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) => {
    setFile(imgRef.current.value);
  };

  return (
    <Container className="border-2 rounded-lg p-5">
      <form className="flex" handleSubmit={onSubmitHandler}>
        <div className="w-[50%] p-[2rem] py-[4rem] border-r-2">
          <Input label="Title" {...register("title", { required: true })} />
          <Input
            label="Slug"
            containerClass="mt-[1rem]"
            {...register("slug")}
          />
          <RTE label="Editor" initialValue="Welcome to BlogSphere!"/>
        </div>

        <div className="w-[50%] px-[8rem] py-[4rem]">
          <Input label="Featured Image" type="file" className="" ref={imgRef} />
          <Select label="Post Status" />
          <Button type="submit" text="Submit" className="w-full" />
        </div>
      </form>
    </Container>
  );
}

export default AddPost;
