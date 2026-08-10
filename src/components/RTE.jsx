/* eslint-disable react/prop-types */

import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import conf from "../conf/conf";
import { Label } from "./ui/label";

export default function RTE({ name, control, label, ...props }) {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<div className="mt-[1rem] w-full space-y-1">
					{label && <Label>{label}</Label>}
					{/* TODO: Remove skeleton */}
					<Skeleton
						className={`h-[25rem] rounded-[8px] border-black ${!isLoading && "animate-none"}`}
					>
						<Editor
							onInit={() => setIsLoading(false)}
							apiKey={conf.tinymceKey}
							value={value}
							init={{
								menubar: true,
								resize: false,
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
