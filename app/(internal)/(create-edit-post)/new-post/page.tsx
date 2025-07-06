import PostForm from "@app/(internal)/(create-edit-post)/PostForm";
import { fetchFromApi } from "@/lib/fetchFromApi";
import { PostCategory } from "@/app/types";
import { getNotification } from "@/lib/getNotification";

const NewPostPage = async () => {
  const { data: categories } = await fetchFromApi<{ data: PostCategory[] }>('/categories');
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl text-zinc-400 font-semibold font-headings px-1 mb-5">Create <span className="text-primary">new post</span></h1>
        <div className="bg-white rounded-2xl border border-primary/15 px-6 py-12">
            <div className="w-full max-w-xl mx-auto">
              <PostForm categories={categories}/>
            </div>
        </div>
    </div>
  )
}

export default NewPostPage
