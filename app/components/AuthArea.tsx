'use client'
import { fetchCurrentUser, logout } from "@/lib/auth";
import { useState, useEffect } from "react";
import { User } from "@/app/types";
import Link from "next/link"
import DropdownMenu from "@components/DropdownMenu"
import PrimaryButton from "@components/PrimaryButton"
import { ArrowRightStartOnRectangleIcon, BookmarkIcon, UserCircleIcon } from "@heroicons/react/24/solid"

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
            <div className="flex items-center gap-2 px-2 py-1 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="w-24 h-3 rounded bg-gray-200" />
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
        <DropdownMenu
            label={user.name}
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

export default AuthArea
