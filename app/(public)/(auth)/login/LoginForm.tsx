'use client'
import PrimaryButton from "@/app/components/PrimaryButton"
import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
// import { login } from "@/lib/auth";
import { useRouter } from 'next/navigation'; 
import { flattenErrors } from "@/utils/flattenLaravelErrors";

const LoginForm = () => {
  const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrors(null);

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error('Error processing server response');
        }

        if (!res.ok) {
          const flatErrors = flattenErrors(data?.errors ?? {});
          setErrors(flatErrors);
          throw new Error(data?.message ?? 'An error occurred during login');
        }

        router.push('/posts');
      } catch (err: any) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <form
        className="relative z-10 max-w-full flex flex-col items-start bg-white/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="title">Login into your account</h1>
        <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
      />

        {errors && errors.length > 0 && (
          <ul className="text-red-700">
            {
              errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))
            }
          </ul>
        )}
        <PrimaryButton className="ms-auto" type="submit" disabled={loading}>
          Login
        </PrimaryButton>
        <p className="w-full text-end">
          Not Registered?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
  )
}

export default LoginForm
