import { fetchFromApi } from "@/lib/fetchFromApi";
import { Post } from "@app/types";
import PostItem from "../components/PostItem";

export default async function PostList({ slug }: { slug?: string }) {
    const postsRes = await fetchFromApi<{ data: Post[] }>(
        `/posts${slug ? `?category_slug=${slug}` : ''}`
    );
    const posts = postsRes.data;

    return (
        <div className='flex flex-col w-full max-w-[42rem] mx-auto py-4'>
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))
            ) : (
                <div className="text-gray-500 text-center col-span-full py-6">
                    No posts found in this category
                </div>
            )}
        </div>
    )
}
