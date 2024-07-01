import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";
import Label from "./Label";

function RTE({ label, initialValue, ...props }) {
  return (
    <div className="mt-[2.5rem] space-y-2">
    {label && <Label label={label}/>}
    <div className="h-[25rem] bg-gray-300 rounded-xl">
      <Editor
        apiKey={conf.tinymceKey}
        initialValue={initialValue}
        init={{
          menubar: true,
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
        {...props}
      />
    </div>
    </div>
  );
}

export default RTE;
