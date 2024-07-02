import { useEffect, useState } from "react";
import {Container,PostForm } from "../components/index";
import databaseService from "../appwrite/databaseService";

function EditPost() {
    const [post,setPost] = useState(null);

    useEffect(() => {
        databaseService.getPost('test').then((data) => {
            if(data) {
                setPost(data);
            }
        })
    })
  return post ? (
    <Container className="border-2 rounded-lg p-5">
      <PostForm post={post} />
    </Container>
  ) : null
}

export default EditPost