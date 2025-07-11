'use client'
import Link from "next/link";
import PrimaryButton from "@/app/components/PrimaryButton";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import { deletePostAction } from "@/app/(internal)/(create-edit-post)/postActions";

const EditDeleteWrapper = ({slug}: {slug: string}) => {
    const [showModal, setShowModal] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(() => {
            deletePostAction(slug);
        });
    };
    
  return (
    <>
        <div className="absolute flex right-0 top-0 p-8 gap-4 items-center">
            <Link  href={`/edit-post/${slug}`}>
                <PrimaryButton  variant="secondary">
                    Edit post
                    <PencilIcon className='size-4' />
                </PrimaryButton>
            </Link>
            <PrimaryButton variant="danger" onClick={() => setShowModal(true)}>
                Delete
                <TrashIcon className='size-4' />
            </PrimaryButton>
        </div>
        {showModal && (
            <div
                role='dialog'
                aria-labelledby='editTask'
                className='fixed inset-0 w-dvw h-dvh bg-black/30 left-0 top-0 flex justify-center items-center z-50 p-12'
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowModal(false);
                    }
                }}
            >
                <div className="w-full max-w-xl bg-gray-100 rounded-2xl text-center flex flex-col px-6 py-12 gap-8">
                    <p className="text-lg">Are you sure you want to delete this post?</p>
                        <div className="flex justify-center gap-4">
                            <PrimaryButton variant="secondary" onClick={() => setShowModal(false)}>
                                No
                            </PrimaryButton>
                            <PrimaryButton
                                onClick={handleDelete}
                                disabled={isPending}
                                className="bg-red-600 text-white hover:!bg-red-500  disabled:opacity-50">
                                Yes, delete
                                <TrashIcon className='size-4' />
                            </PrimaryButton>
                        </div>
                </div>
            </div>
        )}
    </>
  )
}

export default EditDeleteWrapper
