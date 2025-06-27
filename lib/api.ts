const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
    ...options,
    next: { revalidate: 60 },
  });
  console.log('API request:', { endpoint, options, status: res.status });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error: ${res.status} - ${errorBody}`);
  }

  return res.json();
}
