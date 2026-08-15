import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Item } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "@phosphor-icons/react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function CustomFileInput({ control, name, rules = {}, ...props }) {
    return (

        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, ...field } }) => {
                return (
                    <>
                        <Card className="">
                            <CardContent className="flex flex-col gap-3">
                                <Label
                                    htmlFor={name}
                                    className="text-center text-xs font-normal tracking-wider text-muted-foreground uppercase"
                                >
                                    User Avatar
                                </Label>
                                <Item className="aspect-square" variant="outline">
                                    <label
                                        htmlFor={name}
                                        className="flex size-full cursor-pointer items-center justify-center"
                                    >
                                        {value ? (
                                            <img src={value} />
                                        ): (
                                                <ImageIcon
                                                    className="size-10 text-muted-foreground/50"
                                                />
                                        )}

                                    </label>
                                </Item>

                                <Input
                                    id={name}
                                    type="file"
                                    className="sr-only"
                                    {...field}
                                    {...props}
                                    onChange={(e) => {
                                        props.onChange();
                                        onChange(e);
                                    }}
                                />

                            </CardContent>

                            <CardFooter className="flex-col gap-2">
                                <Button variant="secondary" className="w-full" asChild>
                                    <label htmlFor={name} className="cursor-pointer">
                                        Upload Avatar
                                    </label>
                                </Button>
                                <CardDescription className="text-center text-xs">
                                    Maximum 3000 × 3000px
                                    <br />
                                    JPEG or PNG only
                                </CardDescription>
                            </CardFooter>
                        </Card>
                    </>
                )
            }
            }
        />
    )
}