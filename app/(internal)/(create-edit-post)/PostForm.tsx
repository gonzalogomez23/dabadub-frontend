'use client'
import { useState } from "react";
import { type PostCategory, type Post } from "@app/types";
import PrimaryButton from "@components/PrimaryButton";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import { handlePostActions } from "./postActions";

interface PostFormProps {
    initialData?: Post | null
    categories?: PostCategory[]
    isEditMode?: boolean;
    slug?: string;
}

const PostForm = ({ initialData, categories, isEditMode = false, slug }: PostFormProps) => {

    const [postData, setPostData] = useState({
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        content: initialData?.content ?? "",
        category_id: initialData?.category?.id ?? "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value === "0" ? "" : parseInt(e.target.value);
        setPostData((prev) => ({
            ...prev,
            category_id: selectedValue,
        }));
    }

    return (
        <form
            className="flex flex-col items-start gap-5 w-full"
            action={handlePostActions}
        >
            <input type="hidden" name="isEditMode" value={isEditMode ? 'true' : 'false'} />
            {isEditMode && <input type="hidden" name="slug" value={slug} />}
            {/* <div className="flex flex-col gap-2 w-full">
                {post.image && (
                    <div className="mb-4">
                        <p className="mb-2">Current image:</p>
                        <div className="">
                            <img src={post.image} alt="Current image" className=" rounded-lg aspect-video object-cover max-w-80 w-full" />
                        </div>
                    </div>
                )}
                <label htmlFor="fileInput">Upload new image</label>
                <div
                    id="imageUpload"
                    className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                    onDrop={handleFileSelect}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById("fileInput").click()}
                    aria-describedby="imageHelp"
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className=" max-w-80 w-full aspect-video object-cover rounded-lg" />
                    ) : (
                        <p className="text-gray-500">Drag & Drop an image or click to upload</p>
                    )}
                </div>
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/jpg, image/png, image/jpeg, image/webp"
                    onChange={handleFileSelect}
                />
                <p id="imageHelp" className="text-gray-500 text-sm">
                    Accepted formats: jpg, jpeg, png, webp
                </p>
            </div> */}
            <FormInput
                label="Title"
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                value={postData.title}
                onChange={handleChange}
                // error={errors?.password?.[0] ?? null}
            />
            <FormInput
                label="Description"
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                value={postData.description}
                onChange={handleChange}
            />
            <FormInput
                as="textarea"
                label="Content"
                id="content"
                name="content"
                type="text"
                placeholder="Content"
                value={postData.content}
                onChange={handleChange}
            />
            <FormSelect
                label="Category"
                name="category_id"
                value={postData.category_id}
                onChange={handleCategory}
                options={categories ?? []}
                required
                // error={formErrors.category}
            />

            <PrimaryButton className="btn-add" type="submit">
                Save
            </PrimaryButton>
        </form>
    )
}

export default PostForm
