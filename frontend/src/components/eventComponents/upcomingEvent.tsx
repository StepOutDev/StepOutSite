"use client"
import Link from "next/link"
import EventPanel from "./EventPanel"
import { useState, useEffect } from "react";
import { GetCookie } from "../signinForm";
import { User } from "../../../interface";
import getUserMe from "@/libs/user/getUserMe";

export default function UpcomingEvent(){
    const [cookie, setCookie] = useState<string | undefined>();
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
                const [user, setUser] = useState<User>();
                useEffect(() => {
                    const fetchUserData = async () => {
                        if(cookie){
                            const user: User = await getUserMe(cookie);
                            setUser(user);
                        } 
                    };
                    if(user === undefined){
                        fetchUserData();
                    }
                })

    return(
        <div>
            <div className="flex md:flex-row flex-col justify-between items-center mt-[5%] mx-[10%] space-y-3">
                <div className="text-[#422A40] text-[32px] font-bold">
                    Upcoming Event 
                </div>
                {user?.role === "core" && (
                    <Link
                        href={'/eventmanage'}
                        className="px-8 py-2 bg-white rounded-lg shadow-md border-2 border-[#ED79B7] text-[#ED79B7] text-[16px] hover:bg-[#ED79B7] hover:text-white duration-150">
                        Manage
                    </Link>
                )}
            </div>
            <EventPanel/>
        </div>
    )
}