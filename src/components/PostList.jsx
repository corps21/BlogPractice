/* eslint-disable react/prop-types */

import { Loader, PostCard } from "../components";
import storageService from "../appwrite/storageService";

export default function PostList({ isLoading, files }) {
  return isLoading ? (
    <Loader />
  ) : (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
      {files.map((file) => {
        return (
          <PostCard
            url={`/post/${file.$id}`}
            key={file.$id}
            href={storageService.getImagePreview(file.featuredImage).href}
            title={file.title}
            author={file.userId}
          />
        );
      })}
    </div>
  );
}
