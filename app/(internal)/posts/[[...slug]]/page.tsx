import { getNotification } from "@/lib/getNotification";
import NotificationBanner from "@/app/components/NotificationBanner";
import { Suspense } from "react";
import PostCategoriesList from "./CategoriesList";
import PostList from "./PostsList";
import CategoriesListSkeleton from "../components/CategoriesListSkeleton";
import PostsListSkeleton from "../components/PostsListSkeleton";

const PostsPage = async ({ params }: { params:Promise<{ slug: string }> }) => {

    const { slug } = await params;
    const notification = await getNotification();

    return (
        <>
            {notification && (
                <NotificationBanner
                    message={notification.message}
                    type={notification.type}
                />
            )}

            <div className="min-h-100 flex flex-col lg:flex-row gap-3 p-3">
                <aside className="w-full lg:w-80 max-w-full">
                    <div className="w-full flex flex-col gap-6 rounded-xl bg-zinc-50 border border-primary/15 p-2">
                        <Suspense fallback={<CategoriesListSkeleton />}>
                            <PostCategoriesList slug={slug} />
                        </Suspense>
                    </div>
                </aside>

                <div className="content grow">
                    <div className="rounded-xl bg-zinc-50 border border-primary/15 overflow-hidden px-4">
                        <Suspense fallback={<PostsListSkeleton />}>
                            <PostList slug={slug} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostsPage
