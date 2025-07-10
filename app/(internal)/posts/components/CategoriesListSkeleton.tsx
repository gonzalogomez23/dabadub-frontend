const CategoriesListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 py-2">
        {[...Array(6)].map((_, index) => (
            <div
                className="animate-pulse px-4 py-3"
                key={index}
            >
                    <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
            </div>
        ))}
    </div>
  )
}

export default CategoriesListSkeleton
