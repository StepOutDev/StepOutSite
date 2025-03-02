"use client"

import EventCard from "./eventCard"

export default function UpcomingEvent(){
    return (
        <div>
            <div className="mt-[5%] ml-[10%]  text-[#422A40] text-[32px] font-bold text-poppins ">
                Upcoming Event
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