"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserMe from "@/libs/user/getUserMe";
import { GetCookie } from "../signinForm";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function Topmenu () {
    const [cookie, setCookie] = useState<string | undefined>();
    const [user, setUser] = useState<User>(); 
    
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
      return(
          <nav className="flex h-[75px] justify-between backdrop-blur-lg bg-slate-100/70 fixed top-0 left-0 right-0 z-30 border-gray-200 shadow-lg">   
            <Logo/>
            <NavLinks cookie={cookie} user={user}/>        
        </nav>
    )
}

export function signOut(){
    const isConfirmed = window.confirm("Are you sure you want to sign out?");
    if(isConfirmed){
        document.cookie = "jwt=; Max-Age=0; path=/;";
        window.location.href = "/";
    }
}
