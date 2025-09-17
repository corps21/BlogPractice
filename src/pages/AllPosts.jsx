import { SquarePenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container, Header, PostList } from "../components";
import databaseService from "../microservice/databaseService";

function AllPosts() {
	const [isLoading, setIsLoading] = useState(true);
	const [files, setFiles] = useState([]);
	const status = useSelector((state) => state.auth.isLoggedIn);
	const userId = useSelector((state) => state.auth.userData)?.$id;
	useEffect(() => {
		setIsLoading(true);
		if (status) {
			databaseService.getAllPosts(userId).then((data) => {
				if (data) setFiles(data.documents);
				setIsLoading(false);
			});
		} else setIsLoading(false);
	}, [userId, status]);

	return (
		<Container className="flex flex-col items-center">
			<Header pageTitle="All Posts" />
			<div className="flex justify-start w-full mb-6">
				<Button variant="icon" className="pl-0" asChild>
					<Link to="/add-post" className="dark:text-white ">
						<SquarePenIcon className="dark:stroke-white" />
						Create
					</Link>
				</Button>
			</div>
			<PostList isLoading={isLoading} files={files} />
		</Container>
	);
}

export default AllPosts;
