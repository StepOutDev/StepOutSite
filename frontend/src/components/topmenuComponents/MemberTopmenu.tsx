"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link"

export default function MemberTopmenu(){
    const [userMenu, setUserMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const toggleUserMenu = () => {
        setUserMenu(!userMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setUserMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return(
        <div className="h-full" ref={menuRef}>
            <button
                ref={buttonRef}
                onClick={toggleUserMenu}
                className="flex items-center justify-center space-x-2 h-full py-2 pr-4 pl-3 text-black duration-150 ease-in-out hover:bg-[#7A4E9A] hover:text-white hover:scale-110"
                title="Member"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                <span className="self-center font-sans hidden md:flex">Member</span>
            </button>
            {userMenu && (
                <div className="absolute bg-white rounded-lg shadow-lg w-48">
                    <Link
                        href="/kneepads"
                        className="flex space-x-2 px-4 py-4 text-gray-800 hover:bg-[#7A4E9A] hover:text-white hover:rounded-lg"
                        onClick={toggleUserMenu}
                    >
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" xmlns="http://www.w3.org/2000/svg" 
                            className="size-6"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6.5" y="4" width="11" height="16" rx="4" ry="4"/>
                            <circle cx="12" cy="10.5" r="3"/>
                            <line x1="6" y1="8" x2="3" y2="8"/>
                            <line x1="6" y1="16" x2="3" y2="16"/>
                            <line x1="18" y1="8" x2="21" y2="8"/>
                            <line x1="18" y1="16" x2="21" y2="16"/>
                            <line x1="3" y1="8" x2="3" y2="16"/>
                            <line x1="21" y1="8" x2="21" y2="16"/>
                        </svg>
                        <span>Kneepads</span>
                    </Link>
                </div>
            )}
        </div>
    )
}