"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import { GetCookie } from "../signinForm";
import { User, Event } from "../../../interface";
import getUserMe from "@/libs/user/getUserMe";
import ShowMore from "./ShowMore";
import { CalendarIcon, ClockIcon, LocationIcon } from "./ShowMore";
import { usePathname } from "next/navigation";

export default function EventCard(
    { 
        event_name, 
        day, 
        time, 
        place, 
        song, 
        description, 
        image 
    }: Event
){
    const [showMore, setShowMore] = useState<boolean>(false);
    const [cookie, setCookie] = useState<string | undefined>();
    const pathname = usePathname();
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

    const handleEditClick = () => {
        localStorage.setItem("eventData", JSON.stringify({
            event_name, day, time, place, description, image, song
        }));
        window.location.href = "/eventmanage/edit";
    };

    return (
        <div className="relative flex md:flex-col flex-row bg-white rounded-lg shadow-xl items-start
        md:w-[300px] w-full md:h-fit h-[150px] overflow-hidden hover:scale-110 duration-150"
            onClick={() => setShowMore(!showMore)}
        >
            {/* image */}        
            <div className="flex-shrink-0 overflow-hidden shadow-md md:w-full w-[40%] md:max-w-full max-w-[150px] md:h-[200px] h-[150px]">
                <img 
                    src={image || "/images/logo/Logo1.png"} 
                    className="w-full h-full object-cover"
                    alt="EventImage" 
                ></img>
            </div>
            {/* edit */} 
            { (pathname === "/eventmanage") && (
                <button 
                    className="absolute m-2 p-2 top-0 right-0 rounded-full bg-[#777777] hover:scale-110 shadow-xl hover:border-2 duration-150"
                    onClick={handleEditClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:size-6 size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            )
            }
            {/* Detail */}
            <div className="flex flex-col p-4 w-full h-full overflow-hidden">
                <div className="text-[#777777] md:text-[16px] text-[12px] line-clamp-1">
                    {day} — {time}
                </div>
                <div className="line-clamp-2 md:text-[20px] text-[16px] font-semibold text-[#422A40]">
                    {event_name}
                </div>
                <div className="flex-grow"></div>
                <div className="flex items-center text-[#777777] md:text-[16px] text-[12px]">
                    <LocationIcon /> <span className="pl-2 line-clamp-1">{place}</span>
                </div>
            </div>
            {/* show more */}
            {showMore &&
                <ShowMore
                    event={{ event_name, day, time, place, description, image, song }}
                    open={showMore}
                    onClose={()=> setShowMore(showMore)}
                />
            }
        </div>
    )
}