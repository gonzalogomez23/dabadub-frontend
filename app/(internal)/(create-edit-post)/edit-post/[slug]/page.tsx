import { fetchFromApi } from "@/lib/api";
import { type PostCategory, type Post } from "@app/types";
import PostForm from "@app/(internal)/(create-edit-post)/PostForm";

const EditPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const postRes = await fetchFromApi<{ data: Post }>(`/posts/${slug}`);
    const post = postRes.data;
    
  return (
    <PostForm initialData={post} isUpdateMode/>
  )
}

export default EditPostPage
