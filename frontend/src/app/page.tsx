import Banner from "@/components/bannerComponents/banner";
import Contact from "@/components/contactComponents/contact";
import UpcomingEvent from "@/components/eventComponents/upcomingEvent";
import Link from "next/link";

export default function Home() {

  
  return (
    <main className="absolute inset-0 z-10 w-full"> 
      <Banner></Banner>
      
      <UpcomingEvent/>

      <Contact></Contact>
    </main>
  )
}