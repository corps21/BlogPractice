import { Input, Button, Container, Select } from "../components/index"
import { useForm } from "react-hook-form"
import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";

// Select, Button, file input, 

function AddPost() {

  const { register, handleSubmit } = useForm();

  return (
    <Container className="border-2 rounded-lg p-5">
      <form className="flex">

        <div className="w-[50%] space-y-4 p-[2rem] py-[4rem] border-r-2">
          <Input label="Title" {...register("title", {required:true})}/>
          <Input label="Slug" />
          <Editor apiKey={conf.tinymceKey} />
        </div>

        <div className="w-[50%] py-[8rem] px-[8rem]">
          <Input label="Featured Image" type="file" />
          <Select />
          <Button type="submit" text="Submit" className="w-full"/>
        </div>



      </form>
    </Container>
  )
}

export default AddPost
