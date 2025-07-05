import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const formData = await req.formData();
        const token = req.cookies.get('access_token')?.value;

        const title = formData.get('title');
        const description = formData.get('description');
        const content = formData.get('content');

        if (
            typeof title !== 'string' || title.trim() === '' ||
            typeof content !== 'string' || content.trim() === '' ||
            typeof description !== 'string' || description.trim() === ''
        ) {
            return NextResponse.json(
                { message: 'Fields cannot be empty.' },
                { status: 400 }
            );
        }

        const res = await fetch(`${process.env.API_BASE_URL}/posts/${slug}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: (() => {
                formData.append('_method', 'PUT');
                return formData;
            })(),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });

    } catch (error) {
        console.error('Error in PUT /api/posts/[slug]', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = await params;
    const token = req.cookies.get('access_token')?.value;

    try {
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
            return NextResponse.json(
                { message: data.message || 'Something went wrong' },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
