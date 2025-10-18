import { Toaster } from "sonner";
import { Container, Header, SearchBox } from "@/components";
export default function Search() {
	return (
		<Container className="flex flex-col items-center">
			<Header pageTitle="Search" />
			<SearchBox onSearchChange={(val) => console.log(val)} />
			<Toaster />
		</Container>
	);
}
