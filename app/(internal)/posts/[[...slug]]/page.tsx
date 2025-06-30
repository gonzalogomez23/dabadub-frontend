import AsideLink from "@components/AsideLink"
import PostItem from "../PostItem"
import { fetchFromApi } from '@/lib/api';
import { type PostCategory, type Post } from "@app/types";


const PostsPage = async ({params}: {params: Promise<{ slug: string }>}) => {

     const { slug } = await params;

    const [postsRes, categoriesRes] = await Promise.all([
        fetchFromApi<{ data: Post[] }>(`/posts${slug ? `?category_slug=${slug}` : ''}`),
        fetchFromApi<{ data: PostCategory[] }>('/categories')
    ]);

    const posts = postsRes.data;
    const categories = categoriesRes.data;

    return (
        <div className="min-h-100 flex gap-3 p-3">
                {/* Aside menu */}
                <aside className="min-w-80 w-80 max-w-full">
                    <div className="w-full flex flex-col gap-6 rounded-xl bg-white border border-primary/15 p-2">
                        <div className="w-full flex flex-col gap-2">
                            <AsideLink
                                url="/posts"
                                pageSlug={slug}
                            >
                                All posts
                            </AsideLink>
                            {categories.map(category => (
                                <AsideLink
                                    url={`/posts/${category.slug}`}
                                    key={category.id}
                                    pageSlug={slug}
                                    categorySlug={category.slug}
                                >
                                    {category.title}
                                </AsideLink>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main content (Posts list) */}
                <div className="content grow">
                    <div className="rounded-xl bg-white border border-primary/15 overflow-hidden">
                        <div className='flex flex-col w-full max-w-[42rem] mx-auto py-4'>
                            {posts && posts.map(post => (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                ></PostItem>
                            ))}
                            {posts.length === 0 && (
                                <div className="text-gray-500 text-center col-span-full py-6">
                                    No posts found in this category
                                </div>
                            )}
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default PostsPage
