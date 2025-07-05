import PostForm from "@app/(internal)/(create-edit-post)/PostForm";
import { fetchFromApi } from "@/lib/fetchFromApi";
import { PostCategory } from "@/app/types";

const NewPostPage = async () => {
  const { data: categories } = await fetchFromApi<{ data: PostCategory[] }>('/categories');
  
  return (
    <PostForm categories={categories}/>
  )
}

export default NewPostPage
