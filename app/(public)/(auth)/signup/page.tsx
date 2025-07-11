import AuthForm from '@/app/(public)/(auth)/AuthForm'
import PrimaryButton from '@/app/components/PrimaryButton'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div 
      className="w-md max-w-full flex flex-col items-start lg:bg-zinc-50/30 lg:border lg:border-border1 lg:shadow-sm lg:rounded-2xl gap-4 py-6 lg:px-4 lg:p-8"
    >
        <h1 className="title">Create your account</h1>
        <AuthForm isSignup />
        <hr className="w-full text-border1 border-t-2" />
        <p>Already Registered</p>
        <Link href="/login" className="text-primary w-full">
          <PrimaryButton variant="secondary" className="w-full">
            Log in
          </PrimaryButton>
        </Link>
    </div>
  )
}

export default SignUpPage
