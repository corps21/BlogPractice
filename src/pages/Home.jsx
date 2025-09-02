import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import databaseService from "../microService/databaseService";
import { Container, CTA, Header, PostList } from "../components";

function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const status = useSelector((state) => state.user.isLoggedIn);
	const [files, setFiles] = useState([]);

	useEffect(() => {
		if (status) {
			databaseService.getAllActivePosts().then((data) => {
				if (data) setFiles(data.documents);
				setIsLoading(false);
			});
		}
	}, [status]);

	return status ? (
		<Container className="flex flex-col items-center">
			<Header />
			<PostList isLoading={isLoading} files={files} className="mt-6" />
		</Container>
	) : (
		<CTA />
	);
}

export default Home;
