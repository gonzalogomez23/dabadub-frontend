import DropdownMenu from "../DropdownMenu"
import { ArrowRightStartOnRectangleIcon, BookmarkIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { logout } from "@lib/auth"
import { User } from "@/app/types"
import Link from "next/link"
import PrimaryButton from "../PrimaryButton"

const ProfileWrapper = ({user}: {user: User | null}) => {
    const handleLogout = async () => {
        await logout();
    };

    if (!user) {
        return (
            <Link href="/login">
                <PrimaryButton variant="secondary">
                    Log in
                </PrimaryButton>
            </Link>
        )
    }

    return (
        <DropdownMenu
            label={user?.name}
            buttonIcon={(
                <UserCircleIcon className="size-8 text-zinc-400"/>
            )}
        >
            <DropdownMenu.Item className="opacity-50 hover:bg-transparent cursor-default">
                <BookmarkIcon className="size-6"/>
                My favourites
            </DropdownMenu.Item>
            <DropdownMenu.Item className="hover:bg-zinc-100 transition-all" parentMethod={handleLogout}>
                <ArrowRightStartOnRectangleIcon className="size-6"/>
                Log out
            </DropdownMenu.Item>
        </DropdownMenu>
    )
}

export default ProfileWrapper
