"use client"

import EventCard from "./eventCard"

export default function UpcomingEvent(){
    return (
        <div>
            <div className="flex md:flex-row flex-col justify-between items-center mt-[5%] mx-[10%] space-y-3">
                <div className="text-[#422A40] text-[32px] font-bold">
                    Upcoming Event
                </div>
                <button
                    
                    className="px-8 py-2 bg-white rounded-lg border-2 border-[#ED79B7] text-[#ED79B7] text-[16px]">
                    manage event
                </button>
            </div>
            <div className="flex space-x-4 w-[80%] h-[600px] overflow-x-scroll mt-[10px] mx-auto text-black
                custom-scrollbar">
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
        </div>
    )
}