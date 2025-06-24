'use client'

import PrimaryButton from "@/app/components/PrimaryButton"
import { useState } from "react"
import Link from "next/link"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const SignupForm = () => {
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors(null)
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        // password_confirmation: formData.get('password_confirmation'),
    }

    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include' // 👈 importante si Laravel va a establecer cookies
      })

      const data = await res.json()

      if (!res.ok) {
        // Errores de validación u otros
        setErrors(data.errors || { general: [data.message || 'Signup failed'] })
      } else {
        // Signup exitoso
        console.log('Signup successful:', data)
        // Redirigir, guardar user en estado, etc.
      }

    } catch (err) {
      console.error('Error:', err)
      setErrors({ general: ['Network error or server not responding'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full flex flex-col items-start bg-white/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
    >
      <h1 className="title">Create your account</h1>

      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key]?.[0] || "Unknown error"}</p>
          ))}
        </div>
      )}

      <input className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary" type="text" name="name" placeholder="Full Name" />
      <input className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary" type="email" name="email" placeholder="Email Address" />
      <input className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary" type="password" name="password" placeholder="Password" />

      <PrimaryButton className="ms-auto" type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </PrimaryButton>

      <p className="w-full text-end">
        Already Registered? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  )
}

export default SignupForm
