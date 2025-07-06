import AuthForm from '@/app/(public)/(auth)/AuthForm'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div 
      className="w-sm max-w-full flex flex-col items-start bg-zinc-50/30 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8"
    >
        <h1 className="title">Create your account</h1>
        <AuthForm isSignup />
        <p className="w-full text-end">
          Already Registered? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
    </div>
  )
}

export default SignUpPage
