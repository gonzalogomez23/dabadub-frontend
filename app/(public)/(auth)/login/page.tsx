import AuthForm from '@/app/(public)/(auth)/AuthForm'
import PrimaryButton from '@/app/components/PrimaryButton'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div 
      className="w-md max-w-full flex flex-col items-start lg:bg-zinc-50/30 lg:border lg:border-border1 lg:shadow-sm lg:rounded-2xl gap-4 py-6 lg:px-4 lg:p-8"
    >
        <h1 className="title px-2">Log in to your account</h1>
        <AuthForm />
        {/* <p className="w-full text-end">
          Not Registered? <Link href="/signup" className="text-primary hover:underline">Create an account</Link>
        </p> */}
        <hr className="w-full text-border1 border-t-2" />
        <p>Not Registered?</p>
        <Link href="/signup" className="text-primary w-full">
          <PrimaryButton variant="secondary" className="w-full">
            Create an account
          </PrimaryButton>
        </Link>
    </div>
  )
}

export default LoginPage
