import { useState } from "react";
import { DotsThreeOutlineVerticalIcon, BookmarkSimpleIcon, TrashIcon, EraserIcon } from "@phosphor-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { DeletePostModal } from "./DeletePostModal";
import { useSelector } from "react-redux";

export function PostActionDropdown({data, slug}) {
    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.userData?._id);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="absolute right-156 top-33 m-0 p-0">
                    < DotsThreeOutlineVerticalIcon className="size-4.75 cursor-pointer" weight="fill" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>

                    <DropdownMenuItem disabled className="cursor-pointer">
                        <BookmarkSimpleIcon weight="bold" className="size-4" />
                        Save
                    </DropdownMenuItem>

                    {userId === data.post.author && (
                        <>
                            <DropdownMenuItem onClick={() => navigate(`/posts/${slug}/edit`)} className="cursor-pointer">
                                <EraserIcon weight="bold" className="size-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpen(true)} className="cursor-pointer">
                                <TrashIcon weight="bold" className="size-4" />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <DeletePostModal open={open} setOpen={setOpen} />
        </>
    )
}