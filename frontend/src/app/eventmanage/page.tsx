"use client"

import Link from "next/link"
import EventPanel from "@/components/eventComponents/EventPanel"

export default function EventManage(){
    return(
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
    )
}