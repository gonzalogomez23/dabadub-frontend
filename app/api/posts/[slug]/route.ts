import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params:Promise<{ slug: string }> }) {
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
