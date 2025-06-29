import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const API_BASE_URL = process.env.API_BASE_URL;

  if (token) {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set({
    name: 'access_token',
    value: '',
    maxAge: 0,
    path: '/',
  });

  return response;
}
