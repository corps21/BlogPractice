/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

function PostCard({href="",title="",author="", url="/edit-post" }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-300 p-[1rem] text-center h-full w-full rounded-lg grid align-center cursor-pointer" onClick={() => navigate(url)}>
      <figure className="">
        <img src={href} alt="" className="rounded-lg" />
        </figure>
        <h2 className="flex justify-center items-center text-lg font-bold">{title}</h2>
        <h3  className="flex justify-center items-center">By {author}</h3>
    </div>
  )
}

export default PostCard