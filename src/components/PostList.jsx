/* eslint-disable react/prop-types */

import { Loader, PostCard } from "../components";
import storageService from "../appwrite/storageService";

export default function PostList({ isLoading, files, className=""}) {
  return isLoading ? (
    <Loader />
  ) : (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full ${className}`}>
      {files.map((file) => {
        const {$id:key,title,authorName,featuredImage} = file
        return (
          <PostCard
            url={`/post/${key}`}
            key={key}
            href={storageService.getImagePreview(featuredImage).href}
            title={title}
            authorName={authorName}
          />
        );
      })}
    </div>
  );
}
