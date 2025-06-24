import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch('http://localhost:8000/api/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify(body),
    })

  const data = await response.json()

  return NextResponse.json(data, { status: response.status })
}
