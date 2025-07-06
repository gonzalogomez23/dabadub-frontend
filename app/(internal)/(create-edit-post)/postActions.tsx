'use server';

import { cookies } from 'next/headers';
import { setNotification } from '@/lib/server/setNotification';
import { redirect } from 'next/navigation';

interface PostActionParams {
    formData: FormData;
    slug?: string;
    isEditMode?: boolean;
}

export async function handlePostActions(formData: FormData) {
    const isEditMode = formData.get('isEditMode') === 'true';
    const slug = formData.get('slug') as string | undefined;

    return postActionHandler({ formData, slug, isEditMode });
}

async function postActionHandler({ formData, slug, isEditMode }: PostActionParams) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

    // Validation
    // const title = formData.get('title');
    // const description = formData.get('description');
    // const content = formData.get('content');
    // const category_id = formData.get('category_id');


    // if (
    //     typeof title !== 'string' || title.trim() === '' ||
    //     typeof content !== 'string' || content.trim() === '' ||
    //     typeof description !== 'string' || description.trim() === ''
    // ) {
    //     setNotification({
    //         message: 'Title, content and description fields are required.',
    //         type: 'error',
    //     });
    //     redirect(isEditMode && slug ? `/posts/${slug}/edit` : '/new-post');
    // }

    const endpoint = isEditMode && slug
        ? `${process.env.API_BASE_URL}/posts/${slug}`
        : `${process.env.API_BASE_URL}/posts`;

    if (isEditMode) {
        formData.append('_method', 'PUT');
    }

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!res.ok) {
        const data = await res.json();
        setNotification({
            message: data.message || (isEditMode ? 'Error updating the post.' : 'Error creating the post.'),
            type: 'error',
        });
        redirect(isEditMode && slug ? `/edit-post/${slug}` : '/new-post');
    }

    setNotification({
        message: isEditMode ? 'Post updated successfully.' : 'Post created successfully.',
        type: 'success',
    });

    redirect('/posts');
}