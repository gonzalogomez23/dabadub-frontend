import { User } from '@/app/types';
import { fetchFromApi } from './api';

interface SignupData {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
}

export const signup = async (formData: SignupData) => {
  try {
    const data = await fetchFromApi<{ access_token: string }>('/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    localStorage.setItem('token', data.access_token);
    return data;
  } catch (err: any) {
    throw { status: err.status || 500, ...err };
  }
};

interface LoginData {
  email: string;
  password: string;
}

export const login = async (formData: LoginData) => {
  try {
    const data = await fetchFromApi<{ access_token: string }>('/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    console.log('trying to log in', data)
    localStorage.setItem('token', data.access_token);
    return data;
  } catch (err: any) {
    throw { status: err.status || 500, ...err };
  }
};

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
};

export const fetchCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return await fetchFromApi<User>('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    return null;
  }
};
