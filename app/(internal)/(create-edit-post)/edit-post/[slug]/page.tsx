import { fetchFromApi } from "@/lib/fetchFromApi";
import { type PostCategory, type Post } from "@app/types";
import PostForm from "@app/(internal)/(create-edit-post)/PostForm";

const EditPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const postRes = await fetchFromApi<{ data: Post }>(`/posts/${slug}`);
    const categoriesRes = await fetchFromApi<{ data: PostCategory[] }>('/categories');
    const post = postRes.data;
    const categories = categoriesRes.data;
    
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl text-zinc-400 font-semibold font-headings px-1 mb-5">Update post <span className="text-primary">{post.title}</span></h1>
        <div className="bg-white rounded-2xl border border-primary/15 px-6 py-12">
            <div className="w-full max-w-xl mx-auto">
              <PostForm
                initialData={post}
                categories={categories}
                isEditMode
                slug={slug}
              />
            </div>
        </div>
    </div>
  )
}

export default EditPostPage
