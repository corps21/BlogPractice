import { Container, PostForm } from "../components";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";

function EditPost() {
    const[post,setPost] = useState(null);

  useEffect(() => {
    databaseService.getPost('test').then((data) => {
        if(data) {
            setPost(data);
        } 
    })
  }, [setPost]);

  return (
    <Container className="border-2 rounded-lg p-5">
      <PostForm post={post}/>
    </Container>
  );
}

export default EditPost;
