/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { AvatarCard } from ".";
import databaseService from "@/appwrite/databaseService";

function PostCard({ href = "", title = "", authorName, url = "/" }) {
  const navigate = useNavigate();
  return (
    <article className="relative hover:cursor-pointer">
      <figure className="aspect-square min-w-[14rem] md:max-w-[18rem]" onClick={() => navigate(url)}>
        <img src={href} className="rounded-[8px]"/>
      </figure>
      <div className="absolute text-white bg-[#1d1d1d34] bottom-0 backdrop-blur-sm p-2 w-full md:max-w-[18rem] rounded-[8px]">
        <h2 className="capitalize text-xl font-medium">{title}</h2>
        <AvatarCard avatarName={authorName} avatarHref={databaseService.getUserAvatar(authorName)}/>
      </div>
    </article>
  );
}

export default PostCard;
