'use client'
import PrimaryButton from "@/app/components/PrimaryButton"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/auth"
import FormInput from "@/app/components/FormImput"

type FormErrors = Record<string, string[]>;

const SignupForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const [errors, setErrors] = useState<FormErrors | null>(null);
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
        await signup(formData)
        router.push('/posts');
    }catch (err: unknown) {
    console.error(err);

    if (err && typeof err === 'object' && !Array.isArray(err)) {
        setErrors(err as FormErrors);
    } else if (err instanceof Error) {
        setErrors({ general: [err.message] });
    } else {
        setErrors({ general: ['An unexpected error occurred.'] });
    }
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
      <FormInput
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        error={errors?.name?.[0] ?? null}
      />
      <FormInput
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={errors?.email?.[0] ?? null}
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors?.password?.[0] ?? null}
      />
      <FormInput
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        value={formData.password_confirmation}
        onChange={handleChange}
        />

      <PrimaryButton className={`ms-auto ${loading && 'cursor-default opacity-50'}`} type="submit" disabled={loading}>
          Signup
      </PrimaryButton>
      {errors?.general && (
        <p className="text-sm text-red-500">{errors.general[0]}</p>
      )}
      <p className="w-full text-end">
        Already Registered? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  )
}

export default SignupForm
