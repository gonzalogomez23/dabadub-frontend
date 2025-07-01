
const LoadingPosts = async () => {

    return (
        <div className="min-h-100 flex gap-3 p-3">
                {/* Aside menu */}
                <aside className="min-w-80 w-80 max-w-full">
                    <div className="w-full flex flex-col gap-6 rounded-xl bg-zinc-50 border border-primary/15 p-2">
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
                    </div>
                </aside>

                {/* Main content (Posts list) */}
                <div className="content grow">
                    <div className="rounded-xl bg-zinc-50 border border-primary/15 overflow-hidden">
                        <div className='flex flex-col w-full max-w-[42rem] mx-auto py-4'>
                            {[...Array(6)].map((_, index) => (
                                <div className="animate-pulse border-b-2 border-primary/15 nth-last:border-none flex flex-col gap-4 px-4 py-6" key={index}>
                                    <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                    <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default LoadingPosts
