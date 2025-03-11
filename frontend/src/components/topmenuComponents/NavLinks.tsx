"use client"
import { User } from "../../../interface";
import Link from "next/link";
import { signOut } from "./Topmenu";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "../protectRoute/protectRoute";
import KneepadsPage from "@/app/kneepads/page";
import MemberTopmenu from "./MemberTopmenu";

interface NavLinksProps {
    cookie?: string;
    user?: User;
}

export default function NavLinks({cookie, user}:NavLinksProps){
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

    return (
        <div className="flex items-center">
                <Link
                    href="/"
                    className="flex items-center justify-center space-x-2 h-full px-4 text-black duration-150 ease-in-out hover:bg-[#7A4E9A] hover:text-white hover:scale-110"
                    title="Home"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="hidden md:flex">Home</span>
                </Link>
                { cookie? 
                    (
                        <MemberTopmenu/>
                    ): null
                }
                <a
                    href="/#contact"
                    className="flex items-center justify-center space-x-2 h-full px-4 text-black duration-150 ease-in-out hover:bg-[#7A4E9A] hover:text-white hover:scale-110"
                    title="Contact"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            className="size-6"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <span className="hidden md:flex">Contact</span>
                </a>
                {cookie? 
                    (
                        <div className="" ref={menuRef}>
                            <button
                                ref={buttonRef}
                                onClick={toggleUserMenu}
                                className="items-center justify-center my-[8px] w-[59px] h-[59px] rounded-full overflow-hidden border-2 border-white shadow-lg hover:border-[#7A4E9A] transition"
                            >
                                <img 
                                    src={user?.image || "/images/user/default-profile.png"} 
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            {userMenu && (
                                <div className="absolute right-0 bg-white rounded-lg shadow-lg w-48">
                                    <Link
                                        href="/myprofile"
                                        className="flex space-x-2 px-4 py-4 text-gray-800 hover:bg-[#7A4E9A] hover:text-white hover:rounded-lg"
                                        onClick={toggleUserMenu}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor" 
                                            className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <span>Edit profile</span>
                                    </Link>
                                    <Link
                                        href="/"
                                        onClick={signOut}
                                        className="flex space-x-2 w-full text-left px-4 py-4 text-gray-800 hover:bg-[#7A4E9A] hover:text-white hover:rounded-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor" 
                                            className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                        </svg>
                                        <span>Sign out</span>
                                    </Link>
                                </div>
                            )}

                        </div>
                    ):(
                        <div className="flex space-x-2 mx-2">
                            <Link

                                href="/signin"
                                className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center space-x-2 h-full p-4 text-gray-100 duration-150 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg hover:scale-110"
                                title="Sign In"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>
                                    <span className="hidden md:flex">Sign In</span>
                            </Link>
                            <Link
                                href="/signup"
                                className="flex items-center bg-[#7A4E9A] rounded-2xl justify-center space-x-2 h-full p-4 text-gray-100 duration-150 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg hover:scale-110"
                                title="Sign Up"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" viewBox="0 0 24 24"     
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>
                                    <span className="hidden md:flex">Sign up</span>
                            </Link>
                        </div>
                    )
                }
            </div>
    )
}