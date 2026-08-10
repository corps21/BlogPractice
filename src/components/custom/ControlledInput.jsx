import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function ControlledInput({ control, rules, name, ...props }) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => <Input
                id={name}
                {...field}
                {...props}
            />
            }
        />
    );
}