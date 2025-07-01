'use client'
import PrimaryButton from "@/app/components/PrimaryButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup, login } from "@/lib/auth"
import FormInput from "@/app/components/FormImput"

type FormErrors = Record<string, string[]>;

const AuthForm = ({ isSignup = false }) => {
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
      await (isSignup
        ? signup(formData)
        : login({ email: formData.email, password: formData.password }));
      router.push('/posts');
    } catch (err: unknown) {
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
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      {isSignup && (
        <FormInput
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          error={errors?.name?.[0] ?? null}
        />
      )}
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
      {isSignup && (
        <FormInput
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
      )}

      <PrimaryButton className={`ms-auto ${loading && 'cursor-default opacity-50'}`} type="submit" disabled={loading}>
          {isSignup ? 'Sign Up' : 'Log In'}
      </PrimaryButton>
      {errors?.general && (
        <p className="text-sm text-red-500">{errors.general[0]}</p>
      )}
    </form>
  )
}

export default AuthForm
