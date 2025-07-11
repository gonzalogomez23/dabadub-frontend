'use client'
import { logout, fetchCurrentUser } from "@/lib/auth";
import { useState, useEffect } from "react";
import { User } from "@/app/types";
import Link from "next/link"
import DropdownMenu from "@components/DropdownMenu"
import PrimaryButton from "@components/PrimaryButton"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { ArrowRightStartOnRectangleIcon, BookmarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

const  AuthArea = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await fetchCurrentUser();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);
    
    const handleLogout = async () => {
        await logout();
        setUser(null)
    };

    if (loading) {
        return (
            <div className="p-2">
                <div className="flex items-center gap-2 px-2 py-1 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="w-24 h-3 rounded bg-gray-200" />
                </div>
            </div>
        )
    }

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
        <div className="flex gap-4 items-center">
            <DropdownMenu
                label={user.name}
                buttonIcon={(
                    <UserCircleIcon className="size-8 text-zinc-400"/>
                )}
            >
                <DropdownMenu.Item url="/new-post" className="hover:bg-zinc-100 transition-all">
                        <PencilSquareIcon className="size-6 p-0.5"/>
                        New post
                    </DropdownMenu.Item>
                <DropdownMenu.Item className="opacity-30 hover:bg-transparent cursor-default">
                    <BookmarkIcon className="size-6 p-0.5"/>
                    My favourites
                </DropdownMenu.Item>
                <DropdownMenu.Item className="hover:bg-zinc-100 transition-all" parentMethod={handleLogout}>
                    <ArrowRightStartOnRectangleIcon className="size-6 p-0.5"/>
                    Log out
                </DropdownMenu.Item>
            </DropdownMenu>
        </div>
    )
}

export default AuthArea
