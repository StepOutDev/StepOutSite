"use client"

import Link from "next/link"
import EventCard from "./eventCard"
import { Event } from "../../../interface"
import { useState, useEffect } from "react"
import getAllEvents from "@/libs/event/getAllEvents"

export default function EventPanel(){

    const [events, setEvents] = useState<Event[]>([]);
            useEffect(() => {
                const fetchEvents = async () => {
                    const events:Event[] = await getAllEvents();
                    setEvents(events);
                };
                
                fetchEvents();
            },[])

    return (
        <div>
            <div className="flex space-x-4 w-[80%] md:min-h-[600px] min-h-[550px] overflow-x-scroll mt-[10px] mx-auto px-4 text-black
                custom-scrollbar shadow-xl">
                {events.length > 0 ? (
                    events.map((event, index) => (
                    <EventCard key={index} {...event} />
                    ))
                ) : (
                    <p className="text-gray-500">No events available.</p>
                )}
            </div>
        </div>
    )
}