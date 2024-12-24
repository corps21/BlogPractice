import { Container, Loader, PostForm } from "../components";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";
import { useParams } from "react-router-dom";
import { Header } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    databaseService.getPost(slug).then((data) => {
      if (data) setPost(data);
    })
  }, [slug]);

  return post ? (
    <Container className="border-2 rounded-lg p-5 mb-[8rem]">
      <Header pageTitle="Edit Post"/>
      <PostForm post={post} />
    </Container>
  ) : <Loader />
}

export default EditPost;
