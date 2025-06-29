import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const API_BASE_URL = process.env.API_BASE_URL;

  const backendRes = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  let data;
  try {
    data = await backendRes.json();
  } catch {
    data = {};
  }

  if (!backendRes.ok) {
    return NextResponse.json(
      {
        message: data.message ?? 'Login failed',
        errors: data.errors ?? {},
      },
      { status: backendRes.status }
    );
  }

  const token = data.access_token;

  const response = NextResponse.json({
    message: 'Login successful',
    user: data.user,
  });

  response.cookies.set({
    name: 'access_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
