'use client'
import { UserProvider } from "@/context/UserProvider"
import AuthArea from "./AuthArea"

const AuthWrapper = () => {
    return (
        <UserProvider>
            <AuthArea />
        </UserProvider>
    )
}

export default AuthWrapper
