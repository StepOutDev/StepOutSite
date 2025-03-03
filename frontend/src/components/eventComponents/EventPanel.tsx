"use client"

import Link from "next/link"
import EventCard from "./eventCard"

export default function EventPanel(){
    return (
        <div>
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