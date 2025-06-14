"use client"
import { User } from "../../../interface";
import { useEffect, useState } from "react";
import Link from "next/link";
import MemberTopmenu from "./MemberTopmenu";

interface BurgerMenuProps {
  cookie?: string;
  user?: User;
}

export default function BurgerMenu({ cookie, user }: BurgerMenuProps) {

    return (
        <div className="flex flex-col h-full gap-2">
            <Link
                href="/"
                className="flex items-center space-x-2 p-4 text-black duration-150 ease-in-out hover:bg-gray-200 "
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
                    <span className="flex">Home</span>
            </Link>
            { cookie? 
                ( 
                    <Link
                        href="/kneepads"
                        className="flex items-center space-x-2 p-4 text-black duration-150 ease-in-out hover:bg-gray-200 "
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
                ): null
            }
            <a
                href="/#contact"
                className="flex items-center space-x-2 p-4 text-black duration-150 ease-in-out hover:bg-gray-200 "
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
                    <span className="flex">Contact</span>
            </a>
            <div className="flex-grow"></div>
            {cookie? 
                (
                    <div className="flex flex-col gap-2">
                        <div className="flex bg-[#7A4E9A] items-center px-2 gap-2 rounded-xl">
                            <button
                                className="items-center justify-center my-[8px] w-[59px] h-[59px] rounded-full overflow-hidden border-2 border-white shadow-lg"
                            >
                                <img 
                                    src={user?.image || "/images/user/default-profile.png"} 
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </button>         
                            <div className="line-clamp-1 font-semibold">
                                {user?.first_name}
                            </div>
                        </div>
                        <Link
                            href="/myprofile"
                            className="flex items-center space-x-2 p-4 text-black duration-150 ease-in-out hover:bg-gray-200 "
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
                            href="/signout"
                            className="flex items-center space-x-2 p-4 text-black duration-150 ease-in-out hover:bg-gray-200 "
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
                ):(
                    <div className="flex flex-col gap-2">
                        <Link

                            href="/signin"
                            className="flex items-center bg-[#7A4E9A] rounded-2xl space-x-2 h-full p-4 text-gray-100 duration-150 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg "
                            title="Sign In"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor" 
                                    className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                <span className="flex">Sign In</span>
                        </Link>
                        <Link
                            href="/signup"
                            className="flex items-center bg-[#7A4E9A] rounded-2xl space-x-2 h-full p-4 text-gray-100 duration-150 ease-in-out hover:bg-gray-300 hover:text-[#7A4E9A] whitespace-nowrap shadow-lg "
                            title="Sign Up"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24"     
                                    strokeWidth="1.5" 
                                    stroke="currentColor" 
                                    className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                                <span className="flex">Sign up</span>
                        </Link>
                    </div>
                )
            }
        </div>
    );
}
