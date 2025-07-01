import PostForm from "@app/(internal)/(create-edit-post)/PostForm";

const NewPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <PostForm />
  )
}

export default NewPostPage
