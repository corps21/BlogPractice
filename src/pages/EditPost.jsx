import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../appwrite/databaseService";
import { Container, Header, Loader, PostForm } from "../components";

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();

	useEffect(() => {
		databaseService.getPost(slug).then((data) => {
			if (data) setPost(data);
		});
	}, [slug]);

	return post ? (
		<Container className="my-auto">
			<Header pageTitle="Edit Post" />
			<PostForm post={post} />
		</Container>
	) : (
		<Loader />
	);
}

export default EditPost;
