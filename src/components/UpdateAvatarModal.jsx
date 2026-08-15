import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import {CustomFileInput} from "@/components/custom/CustomFileInput";
import {useState} from "react";

export function UpdateAvatarModal({control, name, rules = {}, ...props}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Update Avatar</Button>
                </DialogTrigger>
                <DialogContent className="p-6">
                    <CustomFileInput control={control} name={name} rules={rules} onChange={() => setOpen(false)} {...props} />
                </DialogContent>
        </Dialog>
    )
}
