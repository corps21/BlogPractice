import { Container, Loader, PostForm } from "../components";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";
import { useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    databaseService.getPost(slug).then((data) => {
      if (data) setPost(data);
    })
  }, [slug]);

  return post ? (
    <Container className="border-2 rounded-lg p-5">
      <PostForm post={post} />
    </Container>
  ) : <Loader />
}

export default EditPost;
