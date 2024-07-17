import { useEffect, useState } from "react";
import { Container, Button, Loader } from "../components";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const userId = useSelector(state => state.auth.userData?.$id);
  
  useEffect(() => {
    setIsLoading(true);

    databaseService.getPost(slug).then((data) => {
      if (data) {
        setInfo(() => {
          setIsLoading(false);
          return {
            $id: data.$id,
            title: data.title,
            author: data.userId,
            content: data.content,
            src: storageService.getImagePreview(data.featuredImage).href
          };
        });
      }
    });
  }, [slug]);

  return !isLoading ? (
    <Container>
      {!isLoading && (
        <div>
          {userId === info.author && (
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
            )
          }
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
  ) : <Loader />
}

export default PostPage;
