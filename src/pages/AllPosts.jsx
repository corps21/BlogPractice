import { Container } from "../components";
import databaseService from "../appwrite/databaseService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header, PostList } from "../components";
import { SquarePenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

function AllPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const status = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userData)?.$id;
  const {theme} = useTheme()

  useEffect(() => {
    setIsLoading(true);
    if (status) {
      databaseService.getAllPosts(userId).then((data) => {
        if (data) setFiles(data.documents);
        setIsLoading(false);
      });
    } else setIsLoading(false)
  }, [userId, status]);

  return (
    <Container className="flex flex-col items-center">
      <Header pageTitle="All Posts" />
      <div className="flex justify-start w-full mb-6">
        <Button variant="icon" className="pl-0" asChild>
          <Link to="/all-post/add-post" className="dark:text-white ">
            <SquarePenIcon color={theme === "dark" ? "white" : "#000"} />
            Create
          </Link>
        </Button>
      </div>
      <PostList isLoading={isLoading} files={files} />
    </Container>
  );
}

export default AllPosts;
