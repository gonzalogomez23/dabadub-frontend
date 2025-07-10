'use server';

import { cookies } from 'next/headers';
import { setNotification } from '@/lib/server/setNotification';
import { redirect } from 'next/navigation';
import { FormErrors } from '@/app/types';
import { revalidatePath } from 'next/cache';


export async function handleCreateUpdatePostAction(
    _errors: FormErrors,
    formData: FormData
): Promise<FormErrors> {
    const isEditMode = formData.get('isEditMode') === 'true';
    const slug = formData.get('slug') as string | undefined;

    return postActionHandler({ formData, slug, isEditMode });
}

interface PostActionHandlerParams {
    formData: FormData;
    slug?: string;
    isEditMode?: boolean;
}

async function postActionHandler({ formData, slug, isEditMode }: PostActionHandlerParams): Promise<FormErrors> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('access_token')?.value;

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

    const data = await res.json();


    if (!res.ok) {
        return data.errors ?? {};
    }

    setNotification({
        message: isEditMode ? 'Post updated successfully.' : 'Post created successfully.',
        type: 'success',
    });

    revalidatePath('/posts');
    redirect('/posts');
}

export async function deletePostAction(slug: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    // try {
        const backendUrl = `${process.env.API_BASE_URL}/posts/${slug}`;

        const res = await fetch(backendUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            setNotification({
                message: data.message || 'Failed to delete post.',
                type: 'error',
            });
            revalidatePath('/posts');
            redirect('/posts');
        }
        console.log(data);
        setNotification({
            message: 'Post deleted successfully.',
            type: 'success',
        });
        revalidatePath('/posts');
        redirect('/posts');

    // } catch (error) {
    //     console.error('Error deleting post:', error);
    //     setNotification({
    //         message: 'Internal Server Error.',
    //         type: 'error',
    //     });
    //     redirect('/posts');
    // }
}