import { getNotification } from "@/lib/getNotification";
import NotificationBanner from "@/app/components/NotificationBanner";
import { Suspense } from "react";
import PostList from "./PostsList";
import PostsListSkeleton from "../components/PostsListSkeleton";
import CategoriesMenu from "./CategoriesMenu"
import { fetchFromApi } from "@/lib/fetchFromApi";
import { PostCategory } from "@app/types";

const PostsPage = async ({ params }: { params:Promise<{ slug: string[] }> }) => {

    const { slug } = await params;
    const slugCategory = slug?.[0] || null;

    const categoriesRes = await fetchFromApi<{ data: PostCategory[] }>('/categories');
    const categories = categoriesRes.data;

    const currentCategory = categories.find(category => category.slug === slugCategory) || null;

    const notification = await getNotification();

    return (
        <>
            {notification && (
                <NotificationBanner
                    message={notification.message}
                    type={notification.type}
                />
            )}

            <div className="min-h-100 flex flex-col lg:flex-row gap-3 p-2 lg:p-4">
                <CategoriesMenu
                    slug={currentCategory?.slug ?? ''}
                    categories={categories}
                />

                <div className="content grow">
                    {currentCategory ? (
                        <h1 className="text-xl text-zinc-400 font-medium font-headings m-2">Posts about <span className="text-primary text-nowrap text-2xl">{currentCategory?.title}</span></h1>
                    ) : (
                        <h1 className="text-2xl text-primary font-medium font-headings m-2">All Posts</h1>
                    )}
                    <div className="rounded-2xl bg-zinc-50 border border-primary/15 overflow-hidden px-3 py-2 lg:p-4">
                        <Suspense fallback={<PostsListSkeleton />}>
                            <PostList slug={currentCategory?.slug} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostsPage
