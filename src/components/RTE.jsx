/* eslint-disable react/prop-types */

import { Editor } from "@tinymce/tinymce-react";
import conf from "../conf/conf";
import Label from "./Label";
import { Controller } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function RTE({
  name,
  control,
  label,
  defaultValue = "Welcome to BlogSphere",
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div className="mt-[1rem] w-full">
          {label && <Label label={label} className="" />}
          <Skeleton className={`h-[25rem] rounded-[8px] border-black ${!isLoading && "animate-none"}`}>
          <Editor
                onInit={() => setIsLoading(false)}
                apiKey={conf.tinymceKey}
                initialValue={defaultValue}
                init={{
                  initialValue: defaultValue,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "searchreplace",
                    "visualblocks",
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
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={onChange}
                {...props}
              />
          </Skeleton>
        </div>
      )}
    />
  );
}
