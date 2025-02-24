import { useEffect, useState } from "react";
import { Kneepads, User } from "../../../interface";
import KneepadsData from "./kneepadsData";
import { GetCookie } from "../signinForm";
import getUserMe from "@/libs/user/getUserMe";

export default function KneepadsBookPage(props: {kneepads: Kneepads}) {
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
    return (
        <div className="flex flex-col shadow-[3px_5px_4px_rgba(0,0,0,0.25)] 
        border-[3px] border-[#5892CA] rounded-[20px] m-[2%] w-[60%] aspect-[1.5/1] bg-white">
            <div className="flex flex-row justify-start ">
                <div className="flex items-center justify-center inline mx-[20px] mt-[30px]
                p-[30px] font-[poppinsExtraBold] text-[30px] text-[#1A5AB8] bg-[#E6F0FF] 
                h-[80px] w-[120px] rounded-[20px]">
                    No.{props.kneepads.number}
                </div>
                <p className="inline"> 
                    <span className="block mt-[40px] mb-[8px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                        size : {props.kneepads.size}
                    </span>
                    <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                        status : {props.kneepads.status}
                    </span>    
                </p>
            </div>
            <div className="mt-[20px]">
                        <div className="inline ml-[35px] mr-[10px] font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                            User : 
                        </div>
                        <div className="inline font-[poppinsSemiBold] text-[16px] text-[#1A5AB8]">
                            {user?.nick_name} {user?.year} {user?.major}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="inline ml-[35px] mt-[15px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Book Date :
                            </span>
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                {props.kneepads.booking_date}
                            </span>    
                        </p>
                        <p className="inline mr-[35px] mt-[15px]"> 
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                Return Date :
                            </span>
                            <span className="block font-[poppinsRegular] text-[16px] text-[#1A5AB8]">
                                {props.kneepads.return_date}
                            </span>    
                        </p>
                    </div>
        </div>
    );
}