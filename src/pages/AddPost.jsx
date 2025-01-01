import { Container, PostForm, Header } from "../components/index";

function AddPost() {
  return (
    <Container className="space-y-4">
      <Header pageTitle="Create Post"/>
      <PostForm />
    </Container>
  );
}

export default AddPost;
