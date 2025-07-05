const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
    // next: { revalidate: 60 },
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error: ${res.status} - ${errorBody}`);
  }

  try {
    return await res.json();
  } catch {
    throw new Error('Invalid JSON response from API');
  }
}

