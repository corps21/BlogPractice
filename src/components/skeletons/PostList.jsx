import {PostCardSkeleton} from "./PostCard";

export function PostListSkeleton({count = 12}) {
    return <>
        <div className="max-w-4xl mx-auto grid gap-8 px-6 md:grid-cols-3 mt-6">
            {Array(count).fill(null).map((_, index) => (
                <PostCardSkeleton key={index} />
            ))}
        </div>
    </>
}