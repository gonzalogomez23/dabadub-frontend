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
    <PostForm
      initialData={post}
      categories={categories}
      isUpdateMode
      slug={slug}
    />
  )
}

export default EditPostPage
