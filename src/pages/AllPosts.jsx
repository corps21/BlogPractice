import { Container } from "../components";
import databaseService from "../appwrite/databaseService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header, PostList} from "../components";
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

  return (
    <Container className="flex flex-col items-center">
      <Header pageTitle="All Posts"/>
      <PostList isLoading={isLoading} files={files} />
    </Container>
  )
}

export default AllPosts;
