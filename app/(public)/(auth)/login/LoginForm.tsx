'use client'
import PrimaryButton from "@/app/components/PrimaryButton"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { login } from "@/lib/auth";

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
    const [errors, setErrors] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(formData)
            router.push('/posts');
        } catch (err: unknown) {
            console.error(err);
            if (err && typeof err === 'object' && 'flatErrors' in err) {
                setErrors((err as { flatErrors?: string[]; message?: string }).flatErrors ?? []);
                console.error((err as { message?: string }).message);
            } else if (err instanceof Error) {
                console.error(err.message);
            }
        } finally {
            setLoading(false);
        }
  }

  return (
    <form
        className="relative z-10 max-w-full flex flex-col items-start bg-zinc-50/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="title">Login into your account</h1>
        <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="bg-zinc-50/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="bg-zinc-50/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
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
        <PrimaryButton className={`ms-auto ${loading && 'cursor-default opacity-50'}`} type="submit" disabled={loading}>
          Login
        </PrimaryButton>
        <p className="w-full text-end">
          Not Registered? <Link href="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
      </form>
  )
}

export default LoginForm
