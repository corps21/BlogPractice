/* eslint-disable react/prop-types */

import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";
import Label from "./Label";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue="Welcome to BlogSphere!", ...props }) {
  return <Controller control={control} name={name} render={({ field: { onChange } }) => (
    <div className="mt-[2.5rem] space-y-2">
    {label && <Label label={label}/>}
    <div className="h-[25rem] bg-gray-300 rounded-xl">
      <Editor
        apiKey={conf.tinymceKey}
        initialValue={defaultValue}
        init={{
          menubar: true,
          initialValue: defaultValue,
          plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}

        onEditorChange={onChange}
        {...props}
      />
    </div>
    </div>
  )}/>;
}

