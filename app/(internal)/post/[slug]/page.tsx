import { type Post } from "@app/types";
import { notFound } from 'next/navigation';
import { fetchFromApi } from '@/lib/api';
import Image from "next/image";

const PostPage = async ({ params }: {params: Promise<{ slug: string }>}) => {
    const { slug } = await params;

    try {
        const response = await fetchFromApi<{ data: Post }>(`/posts/${slug}`);
        const post = response.data;

        return (
            <div className="py-4">
                <div className="relative rounded-xl bg-zinc-50 border border-primary/15 overflow-hidden max-w-4xl mx-auto">
                    {post.image && (
                        <Image
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 object-cover" 
                            width={0}
                            height={0}
                        />
                    )}
                    <div className="w-full mx-auto flex flex-col gap-6 p-12">
                        {post.category &&
                            <div className="flex">
                                <span className="flex w-fit rounded-full items-center justify-center text-primary text-sm font-headings bg-secondary/10 px-3 py-1">
                                    {post.category.title}
                                </span>
                            </div>
                        }
                        <h2 className="font-headings text-primary text-4xl font-medium">{post.title}</h2>
                        <p className="text-2xl font-serif text-zinc-700">{post.description}</p>
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