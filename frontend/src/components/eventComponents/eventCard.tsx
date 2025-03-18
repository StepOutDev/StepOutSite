"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import { GetCookie } from "../signinForm";
import { User, Event } from "../../../interface";
import getUserMe from "@/libs/user/getUserMe";

export default function EventCard(
    { img, name, date, description }: Event
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

    return (
        <div className="flex flex-col bg-white rounded-3xl shadow-md items-start my-4 md:min-w-[350px] min-w-[300px] overflow-hidden p-4">
            {/* image */}        
            <div className="flex rounded-xl overflow-hidden shadow-md w-full md:min-h-[200px] min-h-[175px]">
                <img 
                    src={img} 
                    className="w-full h-full object-cover"
                    alt="EventImage" 
                ></img>
            </div>
            {/* Detail */}
            <div className="flex flex-col mx-[5%] my-[5%]">
                <div className="md:text-[32px] text-[30px] font-medium text-[#422A40]">
                    {name}
                </div>
                <div className="flex md:text-[16px] text-[14px] font-semibold text-[#422A40] mt-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        className="md:size-6 size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>: {date}</span>
                </div>
                <div className="md:text-[16px] text-[14px] text-[#422A40] mt-2">
                    <div className={"line-clamp-4 leading-relax"}>
                            {description.split("\n").map((line, index) => (
                                <span key={index}>{line}<br /></span>
                            ))}
                        </div>
                        {!showMore && (
                            <button 
                                className="text-gray-500" 
                                onClick={() => setShowMore(true)}
                            >
                            ... Read More
                            </button>
                        )}
                    </div>
            </div>
            {/* show more */}
            {showMore && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative z-50">
                        <button
                            className="absolute top-2 right-4 text-purple-500 hover:text-black z-50"
                            onClick={()=> setShowMore(false)}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-bold text-center mb-4">Event Details</h2>
                        <p className="text-[16px] text-[#422A40]">{description.split("\n").map((line, index) => (
                            <span key={index}>{line}<br /></span>
                            ))}
                        </p>
                    </div>
                </div>
            )}
            {user?.role === "core" ? (
                <div className="flex flex-grow justify-end items-end w-full">
                    <Link
                        href={"/"}
                        className="flex h-fit mx-[5%] my-[5%] w-full py-2 justify-center   bg-white shadow-md rounded-lg border-2 border-[#ED79B7] text-[#ED79B7] text-[16px] hover:bg-[#ED79B7] hover:text-white transition duration-150"
                    >
                        Edit
                    </Link>
                </div>
            ) : (
                <p>{user?.role}</p>
            )}
        </div>
    )
}