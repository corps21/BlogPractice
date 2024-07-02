import { useSelector } from "react-redux"
import { Container, PostCard } from "../components";
import { useEffect, useState } from "react";
import storageService from "../appwrite/storageService";
import databaseService from "../appwrite/databaseService";

function Home() {
  const status = useSelector((state) => state.auth.isLoggedIn);
  const [files,setFiles] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    databaseService.getAllActivePosts().then(data => data ? setFiles(data.documents) : null)
  },[])


  return (
    <>
      <Container className={`flex ${!status ? "justify-end" : "items-start" }`}>
        {!status && (
          <div className="text-9xl uppercase py-10 text-right flex flex-col justify-center">
            <div>Sign Up</div>
            <div>To See Posts</div>
          </div>
        )}

        {status && (
          <div className="pt-[5rem] w-full h-full grid grid-cols-4 grid-rows-[20rem] gap-4">
            {files && files.map((file) => <PostCard key={file.$id} href={storageService.getImagePreview(file.featuredImage)?.href} title={file.title} author={file.userId}/>)}
          </div>
        )}

      </Container>
    </>
  )
}

export default Home
