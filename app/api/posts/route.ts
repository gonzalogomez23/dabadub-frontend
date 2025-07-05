import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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

    const res = await fetch(`${process.env.API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });
    console.log('Respuesta en servidor Next',res)
    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
}
