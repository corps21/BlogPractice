import { Button } from "@/components/ui/tiptap-ui-primitive/button"
import { ArrowLeftIcon } from "@/components/ui/tiptap-icons/arrow-left-icon"
export function BackButton() {
    return (
        <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeftIcon className="size-4" />
            Back
        </Button>
    )
}