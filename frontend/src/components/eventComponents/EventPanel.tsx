"use client"

import Link from "next/link"
import EventCard from "./eventCard"
import { Event } from "../../../interface"

export default function EventPanel(){

    const events: Event[] = [
        {
            img: "/images/bannerImg/freshyGameBanner.jpeg",
            name: "CU Freshy Game 2024",
            date: "23/07/2024",
            description: `โชว์สุดปังขนาดนี้จะพลาดได้ไง\n₊⊹ 13.09.2024 @ Thephasadin Stadium\n⁣หน้าสแตนด์เชียร์ฝั่งประตูใหญ่\n⁣20.00 onwards`
        },
        {
            img: "/images/bannerImg/vishnuBanner.jpg",
            name: "Vishnu 2024",
            date: "30/07/2024",
            description: `พบกับคอนเสิร์ตสุดมันส์\n15.09.2024 @ Central World\nเริ่ม 18.00 เป็นต้นไป`
        },
        {
            img: "/images/bannerImg/freshyGameBanner.jpeg",
            name: "Tech Expo 2024",
            date: "10/08/2024",
            description: `สำรวจเทคโนโลยีแห่งอนาคต\n20.09.2024 @ Impact Arena\nตลอดทั้งวัน`
        },
        {
            img: "/images/bannerImg/vishnuBanner.jpg",
            name: "Sports Day",
            date: "05/09/2024",
            description: `ร่วมเชียร์กีฬาสนุกๆ\n25.09.2024 @ สนามกีฬาจุฬา\nเริ่ม 10.00 เป็นต้นไป`
        }
    ];
    return (
        <div>
            <div className="flex space-x-4 w-[80%] md:min-h-[600px] min-h-[550px] overflow-x-scroll mt-[10px] mx-auto px-4 text-black
                custom-scrollbar shadow-xl">
                {events.map((event, index) => (
                    <EventCard 
                        key={index} 
                        img={event.img} 
                        name={event.name} 
                        date={event.date} 
                        description={event.description} 
                    />
                ))}
            </div>
        </div>
    )
}