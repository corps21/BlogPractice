import { PostList } from "./index";

export function PostRecommendation({ isLoading, data, className, ...props }) {
    return (
        <section className={`max-w-[37em] mx-auto pb-30 ${className}`} {...props}>
            <p className="px-6 mt-20 text-lg font-semibold mb-4">More posts like this</p>
            <PostList isLoading={isLoading} files={data} className="max-w-[37em] grid-cols-1 md:grid-cols-2! " />
        </section>
    )
}