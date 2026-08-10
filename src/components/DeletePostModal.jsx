import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useToastMutation from "@/hooks/useToastMutation";
import { postService } from "@/service/postService";

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup, FieldError } from "@/components/ui/field"
import { Label } from "@/components/ui/label"

import { ControlledInput } from "@/components/custom/ControlledInput";
import { cn } from "@/lib/utils";


export function DeletePostModal() {

    const { slug } = useParams();

    const { control, formState: { errors }, handleSubmit, setValue, clearErrors } = useForm({
        defaultValues: {
            slug: ""
        }
    });

    const navigate = useNavigate();

    const { mutate } = useToastMutation(
        {
            loadingText: "Deleting the post",
            successText: "Successfully deleted the post",
        },
        {
            mutationKey: ["post", "delete"],
            mutationFn: async () => {
                await postService.deletePost({ slug });
            },
            onSuccess: () => {
                navigate("/");
            },
        },
    );

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                setValue("slug", "");
                clearErrors();
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(mutate)}>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="my-4">
                        <Field>
                            <Label htmlFor="slug" className="select-text cursor-text">{`Confirm "${slug}" deletion`}</Label>

                            <ControlledInput
                                control={control}
                                name="slug"
                                rules={{ required: "Slug is required", validate: (value) => value === slug || 'Slug is not matching' }}
                                className={cn(
                                    errors.slug && "border-red-500 focus:border-red-500 focus:ring-red-500", "mt-1"
                                )}
                                placeholder={`${slug}`}
                            />

                            {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive">Delete Permanently</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
