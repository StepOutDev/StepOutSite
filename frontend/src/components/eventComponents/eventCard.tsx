"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import { GetCookie } from "../signinForm";
import { User, FormEvent } from "../../../interface";
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
    }: FormEvent
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
        <div className="flex flex-col bg-white rounded-3xl shadow-md items-start my-4 md:min-w-[350px] min-w-[300px] md:max-w-[350px] max-w-[300px] overflow-hidden p-4">
            {/* image */}        
            <div className="flex rounded-xl overflow-hidden shadow-md w-full md:h-[200px] h-[175px]">
                <img 
                    src={image || "/images/logo/Logo1.png"} 
                    className="w-full h-full object-cover"
                    alt="EventImage" 
                ></img>
            </div>
            {/* Detail */}
            <div className="flex flex-col mx-[5%] my-[5%]">
                <div className="line-clamp-2 md:text-[32px] text-[30px] font-medium text-[#422A40]">
                    {event_name}
                </div>
                <div className="flex mt-1 md:text-[14px] text-[12px] text-[#422A40] items-center">
                    <CalendarIcon/>
                    <span>: {day}</span>
                </div>
                <div className="flex mt-1 md:text-[14px] text-[12px] text-[#422A40] items-center">
                    <ClockIcon/>
                    <span>: {time}</span>
                </div>
                <div className="flex mt-1 md:text-[14px] text-[12px] text-[#422A40] items-center">
                    <LocationIcon/>
                    <span>: {place}</span>
                </div>
                <div className="mt-3 line-clamp-3 leading-relax md:text-[14px] text-[12px] text-[#422A40]">
                    {description.split("\n").map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))}        
                </div>
            </div>
            {/* show more */}
            {showMore && (
                <ShowMore
                    event_name={event_name}
                    day={day}
                    time={time}
                    place={place}
                    image={image}
                    description={description}
                    onClose={()=> setShowMore(false)}
                />
            )}
            {/* Edit Profile */}
            <div className="flex flex-grow justify-end items-end w-full space-x-2">
                <button className="flex h-fit w-full py-2 justify-center bg-white shadow-md rounded-lg border-2 border-[#422A40] text-[#422A40] text-[14px] hover:bg-[#422A40] hover:text-white transition duration-150"
                        onClick={()=> {setShowMore(true)}}
                >
                    More
                </button>
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
            </div>
        </div>
    )
}