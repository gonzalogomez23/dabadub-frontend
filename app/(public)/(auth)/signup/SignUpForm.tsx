'use client'
import PrimaryButton from "@/app/components/PrimaryButton"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/auth"

const SignupForm = () => {
    const router = useRouter()
    const [errors, setErrors] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })

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
        await signup(formData)
        router.push('/posts');
    } catch (err: any) {
        console.error(err);
        setErrors(err.flatErrors ?? {});
        console.error(err.message);
    } finally {
        setLoading(false);
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full flex flex-col items-start bg-white/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
      noValidate
    >
      <h1 className="title">Create your account</h1>
      <input
        className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        value={formData.password_confirmation}
        onChange={handleChange}
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
          Signup
      </PrimaryButton>

      <p className="w-full text-end">
        Already Registered? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  )
}

export default SignupForm
