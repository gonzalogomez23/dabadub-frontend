import { useUserContext } from "@/context/UserProvider"
import ProfileWrapper from "./ProfileWrapper"

const  AuthArea = () => {
    const { user } =  useUserContext()

    // if (!user) {
    //     return (
    //         <div className="flex items-center gap-2 px-2 py-1 animate-pulse">
    //             <div className="w-8 h-8 rounded-full bg-gray-200" />
    //             <div className="w-24 h-3 rounded bg-gray-200" />
    //         </div>
    //     )
    // }

    return <ProfileWrapper user={user} />;
}

export default AuthArea
