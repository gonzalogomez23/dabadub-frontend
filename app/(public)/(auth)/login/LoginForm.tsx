'use client'
import PrimaryButton from "@/app/components/PrimaryButton"
import { useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { fetchFromApi } from "@/lib/api";

const LoginForm = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
    // const {setUser, setToken} = useStateContext()

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

        try {
            const data = await fetchFromApi<{ user: any; token: string }>('/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                }),
            });
            // console.log('Login successful:', data)
            // setUser(data.user);
            // setToken(data.token);
        } catch (err: any) {
            if (err.errors) {
                setErrors(err.errors);
            } else if (err.message) {
                setErrors({ email: [err.message] });
            } else {
                setErrors({ email: ['Unexpected error occurred'] });
            }
        }
    };

  return (
    <form
        className="relative z-10 max-w-full flex flex-col items-start bg-white/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="title">Login into your account</h1>

        <input
          className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
          ref={emailRef}
          type="email"
          placeholder="Email"
        />
        <input
          className="bg-white/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary"
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
        {errors && (
          <ul className="text-red-700">
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key]?.[0]}</li>
            ))}
          </ul>
        )}
        <PrimaryButton className="ms-auto" type="submit">
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
