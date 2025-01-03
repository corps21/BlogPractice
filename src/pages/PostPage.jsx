import { useEffect, useState } from "react";
import { Container, Button, Loader } from "../components";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const userId = useSelector((state) => state.auth.userData?.$id);

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
            fileId: data.featuredImage,
            src: storageService.getImagePreview(data.featuredImage).href,
          };
        });
      }
    });
  }, [slug]);

  return !isLoading ? (
    <Container>
      {!isLoading && (
        <div>
          <div className="my-[6rem]">
            <figure>
              <img src={info.src} alt="" className="aspect-auto" />
            </figure>
          </div>
          <div className="mb-[12rem]">
            <div className="text-4xl text-center">
              {info.title} <br />
            </div>
            <div className="text-center text-2xl text-[#999]">
              By {info.author}
            </div>
            <div className="text-2xl border-2 bg-gray-200 rounded-lg border-black min-h-[16rem] my-[5rem] p-[1rem]">
            {parse(info.content)}
            </div>

            {userId === info.author && (
              <div className="flex justify-between mb-[2rem]">
                <Button
                  className="w-[48%] bg-green-600 hover:text-green-600"
                  text="Edit"
                  onClick={() => navigate(`/all-post/edit-post/${slug}`)}
                />
                <Button
                  className=" w-[48%] bg-red-600 hover:text-red-600"
                  text="Delete"
                  onClick={() => {
                    databaseService.removePost(info.$id)
                    storageService.deleteImage(info.fileId)
                    navigate(`/all-post`)
                  }
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  ) : (
    <Loader />
  );
}

export default PostPage;
