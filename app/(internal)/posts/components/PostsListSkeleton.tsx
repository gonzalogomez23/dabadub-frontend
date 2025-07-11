const PostsListSkeleton = () => {
  return (
    <div className='flex flex-col w-full max-w-[42rem] mx-auto lg:py-4'>
        {[...Array(6)].map((_, index) => (
            <div className="animate-pulse border-b-2 border-primary/15 nth-last:border-none flex flex-col gap-4 px-4 py-6" key={index}>
                <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
            </div>
        ))}
    </div>
  )
}

export default PostsListSkeleton
