import { useEffect,useState } from "react";

export default function useDebounce(input,delay=500) {
    const [debouncedValue, setDebouncedValue] = useState();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, delay);
        return () => clearTimeout(timeout);
    }, [input]);

    return debouncedValue;
}
