import { Container, PostCard } from "../components";
import databaseService from "../appwrite/databaseService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import storageService from "../appwrite/storageService";
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
    <Container className={`flex justify-end `}>
      {status && (
        <div className="pt-[5rem] w-full h-full grid grid-cols-4 grid-rows-[20rem] gap-4">
          {files.map((file) => (
            <PostCard
              url="/"
              key={file.$id}
              href={storageService.getImagePreview(file.featuredImage)?.href}
              title={file.title}
              author={file.userId}
            />
          ))}
        </div>
      )}
    </Container>
  ) : <Container className="text-9xl flex items-center justify-center">Loading...</Container>
}

export default AllPosts;
