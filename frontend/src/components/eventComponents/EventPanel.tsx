"use client"

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
        <div className="flex my-8 mx-[5%]">
            <div className="flex flex-wrap justify-center gap-x-8 md:gap-y-16 gap-y-4">
            {events.length > 0 ? (
                events.map((event, index) => (
                <EventCard key={index} {...event} />
                ))
            ) : (
                <p className="text-gray-500">Coming soon...</p>
            )}
            </div>   
        </div>
    )
}