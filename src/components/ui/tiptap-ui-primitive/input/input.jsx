import { cn } from "@/lib/tiptap-utils"
import "@/components/ui/tiptap-ui-primitive/input/input.scss"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="tiptap-input"
      className={cn("tiptap-input", className)}
      {...props} />
  );
}

export { Input }
