import { useEffect, useState } from "react";
import { Container , Button} from "../components";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const postId = "hello";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    databaseService.getPost(postId).then((data) => {
      if (data) {
        setInfo(() => {
          const info = {};
          info.$id = data.$id;
          info.title = data.title;
          info.author = data.userId;
          info.content = data.content;
          info.src = storageService.getImagePreview(data.featuredImage).href;
          return info;
        });
      }
    });
    setIsLoading(false);
  }, []);

  return (
    <Container>
      {!isLoading && (
        <div>
          <div>
            <figure>
              <img src={info.src} alt="" className="aspect-auto"/>
            </figure>
          </div>
          <Button text="Edit" onClick={() => navigate("/edit-post")}/>
          <Button text="Delete" onClick={() => databaseService.removePost(info.$id)}/>
          <div>
            {info.title}  By <span>{info.author}</span>
          </div>
          <div>{info.content}</div>
        </div>
      )}
    </Container>
  );
}

export default PostPage;
