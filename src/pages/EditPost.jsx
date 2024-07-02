// import { useEffect, useState } from "react";
import {Container,PostForm } from "../components/index";
// import databaseService from "../appwrite/databaseService";

function EditPost() {
    // const [post,setPost] = useState({});
    // useEffect(() => {
    //     databaseService.getPost((post) => {
    //         if(post) {
    //             setPost(post);
    //         }
    //     })
    // })
  return (
    <Container className="border-2 rounded-lg p-5">
      <PostForm post={{
        title:"test",
        $id:"test",
        content:"test",
        featuredImage:"something",
        status:"inactive"
      }} />
    </Container>
  )
}

export default EditPost