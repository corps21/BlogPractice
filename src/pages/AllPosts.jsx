import { Container, PostCard } from "../components";
import databaseService from "../appwrite/databaseService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import storageService from "../appwrite/storageService";
import {Loader} from "../components";
function AllPosts() {

  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const status = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userData)?.$id;

  useEffect(() => {
    setIsLoading(true);
    if (status) {
      databaseService.getAllPosts(userId).then((data) => {
        if (data) setFiles(data.documents);
        setIsLoading(false);
      });
    }
  }, [userId, status]);

  return !isLoading ? (
    <Container className="mt-[2rem] mb-[12rem]">
      {status && (
        <div className="space-y-[2rem]">
          {files.map((file) => (
            <PostCard
              url={`/post/${file.$id}`}
              key={file.$id}
              href={storageService.getImagePreview(file.featuredImage)?.href}
              title={file.title}
              author={file.userId}
            />
          ))}
        </div>
      )}
    </Container>
  ) : <Loader/>
}

export default AllPosts;
