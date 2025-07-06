import AuthForm from '@/app/(public)/(auth)/AuthForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div 
      className="w-sm max-w-full flex flex-col items-start bg-zinc-50/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
    >
        <h1 className="title">Log in to your account</h1>
        <AuthForm />
        <p className="w-full text-end">
          Not Registered? <Link href="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
    </div>
  )
}

export default LoginPage
