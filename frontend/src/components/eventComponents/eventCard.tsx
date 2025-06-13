"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import { GetCookie } from "../signinForm";
import { User, Event } from "../../../interface";
import getUserMe from "@/libs/user/getUserMe";
import ShowMore from "./ShowMore";
import { CalendarIcon, ClockIcon, LocationIcon } from "./ShowMore";

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
        <div className="flex md:flex-col flex-row bg-white rounded-lg shadow-xl items-start
        md:w-[300px] w-full md:h-fit h-[150px] overflow-hidden"
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
            {/* Edit Event */}
            {/* <div className="flex flex-grow justify-end items-end w-full space-x-2">
                {user?.role === "core"|| user?.role === "admin" ? (
                    <div className="flex flex-grow justify-end items-end w-full">
                        <button
                            onClick={handleEditClick}
                            className="flex h-fit w-full py-2 justify-center bg-white shadow-md rounded-lg border-2 border-[#ED79B7] text-[#ED79B7] text-[14px] hover:bg-[#ED79B7] hover:text-white transition duration-150"
                        >
                            Edit
                        </button>
                    </div>
                ) : null}
            </div> */}
        </div>
    )
}