import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {ControlledInput} from "@/components/custom/ControlledInput";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer";
import { FloppyDiskIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { PostStatusSelect } from "../components";
import {cn} from "@/lib/utils";
import {CustomFileInput} from "@/components/custom/CustomFileInput";

export function PostDrawer({control, errors, setValue, getValues, slugTransform, handleSubmit, onSubmitHandler}) {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="ghost" className="px-2 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 text-black/70 hover:text-black hover:bg-black/10">
                    <FloppyDiskIcon className="size-5 stroke-2" />
                    Submit
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish Post</CardTitle>
                                <CardDescription>
                                    Publish your post to the blog.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>

                                        <ControlledInput
                                            control={control}
                                            name="title"
                                            rules={{ required: "Title is required" }}
                                            className={cn(
                                                errors.title && "border-red-500 focus:border-red-500 focus:ring-red-500",
                                            )}
                                            placeholder="Title of the blog"
                                        />

                                        {errors.title && <FieldError>{errors.title.message}</FieldError>}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="slug">Slug</FieldLabel>

                                        <ControlledInput
                                            control={control}
                                            name="slug"
                                            rules={{ required: "Slug is required" }}
                                            placeholder="Title of the blog"
                                            className={cn(
                                                errors.slug && "border-red-500 focus:border-red-500 focus:ring-red-500",
                                            )}
                                            onInput={(e) => {
                                                setValue("slug", slugTransform(e.currentTarget.value), {
                                                    shouldValidate: true,
                                                });
                                            }}
                                        />

                                        {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="coverImage">Featured Image</FieldLabel>
                                        <CustomFileInput control={control} name="coverImage" type="file" />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="status">Post Status</FieldLabel>

                                        <PostStatusSelect
                                            name="status"
                                            control={control}
                                            defaultValue={"public"}
                                        />
                                    </Field>

                                </FieldGroup>
                            </CardContent>
                            <CardFooter className="flex-col gap-4">
                                <Button type="submit" className="w-full p-4">
                                    <PaperPlaneTiltIcon className="size-4" strokeWidth={2} />
                                    Publish
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}