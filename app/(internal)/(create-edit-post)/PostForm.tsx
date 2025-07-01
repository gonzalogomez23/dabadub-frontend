'use client'
import { useState, useEffect } from "react";
import { type PostCategory, type Post } from "@app/types";
import PrimaryButton from "@components/PrimaryButton";
import { fetchFromApi } from "@/lib/api";

interface PostFormProps {
  isUpdateMode?: boolean;
  initialData?: Post | null
}

const PostForm = ({ isUpdateMode = false, initialData }: PostFormProps) => {
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true)
    // const [errors, setErrors] = useState(null);
    const [postData, setPostData] = useState({
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        content: initialData?.content ?? "",
        category_id: initialData?.category?.id ?? "",
        published: initialData?.published ?? true,
    });
    const [categories, setCategories] = useState<PostCategory[]>([])

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true)
                const res = await fetchFromApi<{ data: PostCategory[] }>('/categories');
                setCategories(res.data);
            } catch (err) {
                console.error(err);
                // setErrors('Error loading categories');
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, [])


    return (
        <form
            className="max-w-full flex flex-col items-start gap-5"
            // onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 w-full">
                {/* {post.image && (
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
                </p> */}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    defaultValue={postData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={postData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="content">Content</label>
                <textarea
                id="content"
                name="content"
                defaultValue={postData.content}
                onChange={handleChange}
                placeholder="Content"
                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            {loadingCategories ? (
                <p className="text-gray-500">Loading categories...</p>
            ) : (
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={postData.category_id}
                        onChange={handleCategory}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-primary bg-white"
                    >
                        <option value="0">None</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <PrimaryButton className="btn-add" type="submit">
                Save
            </PrimaryButton>
        </form>
    )
}

export default PostForm
