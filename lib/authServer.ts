import { cookies } from "next/headers";

export const fetchCurrentUserFromServer = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        cache: 'no-store',
    });
    
    if (!res.ok) {
        // console.error('Failed to fetch user:', res.statusText);
        return null;
    }

    const data = await res.json();
    return data;
};