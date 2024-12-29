import { useSelector } from "react-redux";
import { PostList, CTA, Container, Header } from "../components";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const status = useSelector((state) => state.auth.isLoggedIn);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (status) {
      databaseService.getAllActivePosts().then((data) => {
        if (data) setFiles(data.documents);
        setIsLoading(false);
      });
    }
  }, [status]);

  return status ? (
    <Container className="flex flex-col items-center">
      <Header />
      <PostList isLoading={isLoading} files={files} className="mt-6"/>
    </Container>
  ) : (
    <CTA />
  );
}

export default Home;
