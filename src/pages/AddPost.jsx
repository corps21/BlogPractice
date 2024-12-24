import { Container, PostForm, Header } from "../components/index";

function AddPost() {
  return (
    <Container className="">
      <Header pageTitle="Create Post"/>
      <PostForm />
    </Container>
  );
}

export default AddPost;
