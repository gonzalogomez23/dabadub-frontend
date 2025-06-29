import { flattenErrors } from "@/utils/flattenLaravelErrors";

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

async function authRequest(
    action: 'signup' | 'login',
    formData: SignupData | LoginData
  ) {

  const res = await fetch(`/api/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

  return data;
}

export async function logout() {
  const res = await fetch('/api/logout', { method: 'POST' });
  if (!res.ok) throw new Error('Logout failed');
  return await res.json();
}


export const fetchCurrentUser = async () => {
  try {
    const data = await fetch('/api/user', {
      credentials: 'include'
    });
    return data.ok ? await data.json() : null;
  } catch {
    return null;
  }
};