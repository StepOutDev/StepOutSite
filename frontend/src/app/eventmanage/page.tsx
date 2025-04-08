"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import EventPanel from "@/components/eventComponents/EventPanel"
import ProtectRoute from "@/components/protectRoute/protectRoute"
import { GetCookie } from "@/components/signinForm"
import { User, Kneepads } from "../../../interface"
import getUserMe from "@/libs/user/getUserMe"
import getAllKneepads from "@/libs/kneepads/getAllKneepads"

export default function EventManage(){
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
        const [kneepads, setKneepads] = useState<Kneepads[]>();
        useEffect(() => {
            const fetchUserData = async () => {
                if(cookie){
                    const kneepads:Kneepads[] = await getAllKneepads(cookie);
                    setKneepads(kneepads);
                } 
            };
            if(kneepads === undefined){
                fetchUserData();
            }
        })
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if(cookie && user){
                setLoading(false);
            }

            const interval = setInterval(() => {
                if(!cookie || !user){
                    window.location.href = "/signin";
                }
            }, 200);

            return () => clearInterval(interval);
        },[cookie, user])
        if (loading) {
            return <div>Loading...</div>; // Show a loading message or spinner while fetching data
        }
    return(

        cookie && user ?
            <ProtectRoute role={["admin","core"]} cookie={cookie} user={user}>
                <div className="flex flex-col bg-[#c596c2] min-h-screen">
                    <div className="flex md:flex-row flex-col mt-[120px] mx-[10%] space-x-7 md:space-y-0 space-y-3 items-center">
                        <div className="flex text-[#7A4E9A] font-extrabold text-[32px]">
                            Manage Event
                        </div>
                        <Link
                            href={'/eventmanage/add'}
                            className="h-fit py-2 px-10 bg-white shadow-md rounded-lg border-2 border-[#ED79B7] text-[#ED79B7] text-[16px] hover:bg-[#ED79B7] hover:text-white transition duration-200"
                        >
                            add
                        </Link>
                    </div>


                    <EventPanel/>           
                </div>
            </ProtectRoute>
        : window.location.href = "/signin"
    );
}