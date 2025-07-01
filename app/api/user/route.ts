import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  if (!token) {
    console.log('No token found, returning null user');
    return NextResponse.json(
      { user: null },
      { status: 200 }
    );
  }
      
  const API_BASE_URL = process.env.API_BASE_URL;

  const backendRes = await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message ?? 'Unauthorized' },
      { status: backendRes.status }
    );
  }

  return NextResponse.json({ user: data });
}
