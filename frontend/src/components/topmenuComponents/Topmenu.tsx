"use client"
import { useState, useEffect } from "react"
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { User } from "../../../interface";
import Link from "next/link"
import getUserMe from "@/libs/user/getUserMe";
import { GetCookie } from "../signinForm";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import BurgerMenu from "./BurgerMenu";
import { Modal } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function Topmenu () {
    const [cookie, setCookie] = useState<string | undefined>();
    const [user, setUser] = useState<User>(); 
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState<boolean>(false);
    
    useEffect(() => {
        function fetchCookie() {
            const ck = GetCookie("jwt");
            setCookie(ck);
        }
        fetchCookie();

        const interval = setInterval(() => {
            const currentCookie = GetCookie("jwt");
            if (currentCookie !== cookie) {
              setCookie(currentCookie);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [cookie])
    
    useEffect(() => {
        const fetchUserData = async () => {
            if(cookie){
                const userA:User = (await getUserMe(cookie));
                setUser(userA)
            } 
        };
        if(user === undefined){
            fetchUserData();
        }
        
      }, [cookie, user])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
            setIsOpenBurgerMenu(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Optional: trigger once on mount
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

      return(
        <nav className="flex h-[75px] justify-between backdrop-blur-lg bg-slate-100/70 fixed top-0 left-0 right-0 z-30 border-gray-200 shadow-lg pr-4">   
            <Logo/>
            <div className="flex md:hidden items-center justify-center text-black
                hover:text-white hover:bg-[#7A4E9A] w-[55px] h-[55px] my-[10px] rounded-full hover:scale-110 duration-150" 
                onClick={()=>{setIsOpenBurgerMenu(!isOpenBurgerMenu)}}
            >
                <BurgerIcon/>
                <AnimatePresence>
                    {isOpenBurgerMenu && (
                        <Modal open={isOpenBurgerMenu} onClose={() => setIsOpenBurgerMenu(false)}>
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="fixed right-0 top-0 h-screen w-[200px] bg-stone-50 shadow-lg z-50 p-4"
                            >
                                <BurgerMenu
                                    cookie={cookie}
                                    user={user}
                                />
                            </motion.div>
                        </Modal>
                    )}
                </AnimatePresence>
            </div>

            <div className="hidden md:flex">
                <NavLinks cookie={cookie} user={user}/>        
            </div>
        </nav>
    )
}

export function signOut(){
        document.cookie = "jwt=; Max-Age=0; path=/;";
        window.location.href = "/";
}

export const BurgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);