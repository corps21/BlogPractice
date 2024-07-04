import { useEffect, useState } from "react";
import { Container, Button, Loader } from "../components";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useNavigate, useParams } from "react-router-dom";

function PostPage() {
  const {slug} = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    databaseService.getPost(slug).then((data) => {
      if (data) {
        setInfo(() => {
          const info = {};
          info.$id = data.$id;
          info.title = data.title;
          info.author = data.userId;
          info.content = data.content;
          info.src = storageService.getImagePreview(data.featuredImage).href;
          setIsLoading(false);
          return info;
        });
      }
    });
  }, []);

  return !isLoading ? (
    <Container>
      {!isLoading && (
        <div>
          <div className="flex justify-between mb-[2rem]">
            <Button
              className="w-[48%] bg-green-600 hover:text-green-600"
              text="Edit"
              onClick={() => navigate(`/edit-post/${slug}`)}
            />
            <Button
              className=" w-[48%] bg-red-600 hover:text-red-600"
              text="Delete"
              onClick={() =>
                databaseService.removePost(info.$id) && navigate(`/all-post`)
              }
            />
          </div>
          <div>
            <figure>
              <img src={info.src} alt="" className="aspect-auto" />
            </figure>
          </div>
          <div className="text-6xl text-center mt-[2rem]">
            {info.title} <br />
          </div>
          <div className="text-center text-2xl mb-[5rem]">
              By {info.author}
          </div>
          <div className="text-2xl">{info.content}</div>
        </div>
      )}
    </Container>
  ) : <Loader/>
}

export default PostPage;
