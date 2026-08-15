import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import {CustomFileInput} from "@/components/custom/CustomFileInput";

export function UpdateAvatarModal({control, name, rules = {}, ...props}) {
    return (
        <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Update Avatar</Button>
                </DialogTrigger>
                <DialogContent className="p-6">
                    <CustomFileInput control={control} name={name} rules={rules} {...props} />
                </DialogContent>
        </Dialog>
    )
}
