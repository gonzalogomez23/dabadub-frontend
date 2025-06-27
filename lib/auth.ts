import { User } from '@/app/types';
import { flattenErrors } from "@/utils/flattenLaravelErrors";
import { fetchFromApi } from "./api";

interface SignupData {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
}

interface LoginData {
  email: string;
  password: string;
}

export async function signup(formData: SignupData) {
  return authRequest('signup', formData);
}

export async function login(formData: LoginData) {
  return authRequest('login', formData);
}

async function authRequest<T>(
  action: string = 'operation',
  formData: T,
) {
  const res = await fetch(`/api/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Error processing server response');
  }

  if (!res.ok) {
    const flatErrors = flattenErrors(data?.errors ?? {});
    const error = new Error(data?.message ?? `An error occurred during ${action}`);
    (error as any).flatErrors = flatErrors;
    throw error;
  }

  localStorage.setItem('token', data.access_token);
}

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