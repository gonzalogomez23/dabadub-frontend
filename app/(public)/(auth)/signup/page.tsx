'use client'
import { UserProvider } from '@/context/UserProvider'
import SignupForm from './SignUpForm'

const SignUpPage = () => {
  return (
    <UserProvider>
      <SignupForm />
    </UserProvider>
  )
}

export default SignUpPage
