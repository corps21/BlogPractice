import { Container, Header } from "@/components";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { Toaster } from "sonner";
export default function Search() {
	return (
		<Container className="flex flex-col items-center">
			<Header pageTitle="Search" />
			<div
				className="mt-2 flex w-full items-center rounded-md border border-border bg-transparent pl-3 focus:outline-0 focus-within:ring-1 focus-within:ring-ring dark:border-neutral-800 dark:bg-neutral dark:ring-offset-neutral-950 dark:focus-within:ring-neutral-300 shadow-sm dark:text-white"
			>
				<SearchIcon className="size-6 stroke-neutral-500" />

				<Input
					placeholder="Search"
					className="border-none focus-visible:ring-0"
				/>
			</div>
			<Toaster />
		</Container>
	);
}
