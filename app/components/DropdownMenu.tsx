'use client'
import { useEffect, useRef, useState } from "react"
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
            {buttonIcon ?? buttonIcon}
            {label}
        </button>
        {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-lg bg-white border border-border1 shadow-sm focus:outline-none p-2" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="flex flex-col gap-2" role="none">
                    {children}
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
  parentMethod?: (ev: React.MouseEvent) => void;
}

DropdownMenu.Item = ({children, className = '', parentMethod, ...props }: DropdownMenuItemProps) => {
    return (
        <a href="#" onClick={parentMethod} className={`${className} w-full flex gap-2 items-center hover:bg-gray-200/60 rounded p-2`} {...props}>
            {children}
        </a>
    )
        
}

export default DropdownMenu
