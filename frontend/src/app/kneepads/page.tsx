"use client"

import KneepadsCard from "@/components/kneepadsComponent/kneepadsCard";
import { GetCookie } from "@/components/signinForm";
import getAllKneepads from "@/libs/kneepads/getAllKneepads";
import { useEffect, useState } from "react";
import { Kneepads, User } from "../../../interface";
import ProtectRoute from "@/components/protectRoute/protectRoute";
import getUserMe from "@/libs/user/getUserMe";
import Home from "../page";

export default function KneepadsPage() {
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
            }, 300);
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
            }, 500);

            return () => clearInterval(interval);
        },[cookie, user])

        if (loading) {
            return <div>Loading...</div>; // Show a loading message or spinner while fetching data
        }
    return (
        <ProtectRoute role={["member","admin","core"]} cookie={cookie} user={user}>
            <div className="min-h-screen bg-[#B1C1D8]">
                <div className="pb-[5%] pt-[24%] my-[25px] sm:pt-[20%] sm:px-[20%] md:pt-[15%] 
                md:px-[15%] lg:pt-[10%] lg:px-[10%] lg:pb-[2%] xl:pt-[8%] xl:px-[3%] text-center 
                font-[poppinsBlack] text-5xl md:text-8xl lg:text-8xl text-[#1A5AB8] 
                [text-shadow:_0_5px_4px_rgb(99_102_241_/_0.8)]">
                    Kneepads
                </div>

                {/* <div className="flex flex-row flex-wrap justify-center sm:justify-center 
                md:justify-start lg:justify-start "> */}
                <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(400px,max-content))] gap-4 justify-center p-0">
                    {kneepads?.map((kneepad) => {
                        return(
                        <KneepadsCard key={kneepad.number} kneepads={kneepad}></KneepadsCard>
                        )
                    })}
                </div>

            </div>
        </ProtectRoute>
    );
  }
  