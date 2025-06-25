import { User } from '@/app/types';
import { fetchFromApi } from './api';

export const logout = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await fetchFromApi('/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error('Error logging out:', err);
  }

  localStorage.removeItem('token');
  window.location.reload();
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const user = await fetchFromApi<User>('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user;
  } catch {
    return null;
  }
};
