'use client'
import Link from "next/link";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react"
import { ReactNode } from 'react';

interface DropdownMenuProps {
    label?: string;
    buttonIcon?: ReactNode   
    children: ReactNode 
}

const DropdownMenu = ({ label, buttonIcon, children }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    
    const handleClickOutside = (event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setIsOpen(false)
        }
    }

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    },[])


  return (
    <div className="p-2 relative"  ref={dropdownRef}>
        <button
            // type="submit"
            className="flex items-center cursor-pointer gap-2 px-2 py-1"
            aria-label={`Close add-task mode`}
            onClick={toggleMenu}
        >
            {buttonIcon}
            {label}
        </button>
        {isOpen && (
            <div className="absolute right-0 z-40 mt-2 w-44 origin-top-right rounded-lg bg-zinc-50 border border-border1 shadow-sm focus:outline-none p-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="flex flex-col gap-2" role="none">
                    {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return cloneElement(child as React.ReactElement<DropdownMenuItemProps>, { closeMenu });
                    }
                    return child;
                })}
                </div>
            </div>
        )

        }
        </div>
  )
}


interface DropdownMenuItemProps {
    children: ReactNode;
    className?: string;
    url?: string;
    closeMenu?: () => void;
    parentMethod?: (ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const DropdownItem = ({
    children,
    url,
    className = '',
    parentMethod,
    closeMenu,
    ...props
}: DropdownMenuItemProps) => {

    const baseClasses = `flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-zinc-100 transition-all ${className}`;

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (parentMethod) parentMethod(ev);
        if (closeMenu) closeMenu();
    };

    if (url) return (
        <Link
            href={url}
            onClick={handleClick}
            className={baseClasses}
            {...props}
        >
            {children}
        </Link>
    );

    return (
        <button
            onClick={handleClick}
            className={baseClasses}
            {...props}
        >
            {children}
        </button>
    )
};

DropdownItem.displayName = 'DropdownMenuItem';
DropdownMenu.Item = DropdownItem;

export default DropdownMenu
