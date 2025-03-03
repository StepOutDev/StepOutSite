"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import { GetCookie } from "../signinForm";
import { User } from "../../../interface";
import getUserMe from "@/libs/user/getUserMe";

export default function EventCard(){
    const [showMore, setShowMore] = useState<boolean>(false);
    const description = `โชว์สุดปังขนาดนี้จะพลาดได้ไง\n₊⊹ 13.09.2024 @ Thephasadin Stadium\n⁣หน้าสแตนด์เชียร์ฝั่งประตูใหญ่\n⁣20.00 onwards`;

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
        <div className="flex flex-col bg-white rounded-3xl shadow-md w-[95%] items-start my-4">
            {/* image */}
            <div className="flex mt-4 ml-0 mb-4 justify-center w-[350px]">
                <div className="flex rounded-xl mx-4 w-[450px] h-[250px] overflow-hidden shadow-md">
                    <img 
                        src={"/images/bannerImg/vishnuBanner.jpg"} 
                        className="w-full h-full object-cover"
                        alt="EventImage" 
                    ></img>
                </div>
            </div>
            {/* Detail */}
            <div className="flex flex-col ml-[5%]">
                <div className="text-[32px] font-medium text-[#422A40]">
                    Vishnu 2024
                </div>
                <div className="flex text-[16px] font-semibold text-[#422A40] mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>: 23/07/2024</span>
                </div>
                <div className="text-[16px] text-[#422A40] mt-2 mb-4">
                    <div className={"line-clamp-3 leading-relax"}>
                            {description.split("\n").map((line, index) => (
                                <span key={index}>{line}<br /></span>
                            ))}
                        </div>
                        {!showMore && (
                            <button 
                                className="text-gray-500 ml-2" 
                                onClick={() => setShowMore(true)}
                            >
                                ...Read More
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
                <div className="flex justify-end w-full">
                    <Link
                        href={"/"}
                        className="my-1 mr-8 px-8 py-1 bg-white rounded-lg border-2 border-[#ED79B7] text-[#ED79B7] text-[16px]"
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