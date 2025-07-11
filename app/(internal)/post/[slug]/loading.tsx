import React from 'react'

const loadingPost = () => {
  return (
    <div className="p-4">
        <div className="relative rounded-xl bg-zinc-50 border border-primary/15 overflow-hidden max-w-4xl mx-auto">
            <div className="animate-pulse border-b-2 border-primary/15 nth-last:border-none flex flex-col gap-8 px-4 lg:px-16 lg:py-12 py-6">
                <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <hr className="border-gray-300" />
                <div className="flex flex-col gap-4">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default loadingPost
