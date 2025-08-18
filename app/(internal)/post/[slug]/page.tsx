import { type Post } from "@app/types";
import { notFound } from 'next/navigation';
import { fetchFromApi } from '@/lib/fetchFromApi';
import Image from "next/image";
import { fetchCurrentUserFromServer } from "@/lib/authServer";
import EditDeleteWrapper from "./EditDeleteWrapper";

const PostPage = async ({ params }: { params:Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const user = await fetchCurrentUserFromServer();

    try {
        const response = await fetchFromApi<{ data: Post }>(`/posts/${slug}`);
        const post = response.data;

        return (
            <div className="p-3 lg:p-4">
                <div className="relative rounded-xl bg-zinc-50 border border-primary/15 overflow-hidden max-w-4xl mx-auto">
                    {user &&
                        <EditDeleteWrapper slug={slug}/>
                    }
                    {post.image && (
                        <Image
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 object-cover" 
                            width={0}
                            height={0}
                        />
                    )}
                    <div className="w-full mx-auto flex flex-col gap-4 lg:gap-6 py-6 px-4 lg:px-12 lg:py-12">
                        {post.category &&
                            <div className="flex">
                                <span className="flex w-fit rounded-full items-center justify-center text-primary text-sm font-headings bg-secondary/10 px-3 py-1">
                                    {post.category.title}
                                </span>
                            </div>
                        }
                        <h2 className="font-headings text-primary text-2xl lg:text-4xl font-medium">{post.title}</h2>
                        <p className="text-xl lg:text-2xl font-serif text-zinc-700">{post.description}</p>
                        <hr />
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error: unknown) {
        console.error("Error fetching post:", error);
        notFound();
    }
}

export default PostPage