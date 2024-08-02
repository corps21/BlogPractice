import { useSelector } from "react-redux";
import { Container, Loader, PostCard } from "../components";
import { useCallback, useEffect, useState } from "react";
import storageService from "../appwrite/storageService";
import databaseService from "../appwrite/databaseService";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const status = useSelector((state) => state.auth.isLoggedIn);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    if (status) {
      databaseService.getAllActivePosts().then(data => {
        if (data) setFiles(data.documents);
        setIsLoading(false)
      })
    }
  }, [status]);

  const loadCard = useCallback(() => {
    return isLoading ? <Loader/> : (
      <Container className="mt-[2rem] mb-[12rem]">
        <div className="space-y-[2rem]">
          {files.map((file) => {
            return <PostCard
              url={`/post/${file.$id}`}
              key={file.$id}
              href={
                storageService.getImagePreview(file.featuredImage).href
              }
              title={file.title}
              author={file.userId}
            />
          })}
        </div>
      </Container>
    )
  }, [isLoading,files])

  return status ? loadCard() : (
    <Container className={`text-[4rem] font-bold uppercase leading-tight text-center my-[12rem]`}>
      <div>Sign Up</div>
      <div>To See Posts</div>
    </Container>
  )
}

export default Home;
