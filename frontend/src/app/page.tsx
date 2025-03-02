import Banner from "@/components/bannerComponents/banner";
import Contact from "@/components/contactComponents/contact";
import { useSession } from "next-auth/react";
import UpcomingEvent from "@/components/eventComponents/upcomingEvent";

export default function Home() {

  
  return (
    <main className="absolute inset-0 z-10 w-full"> 
      <Banner></Banner>

      <UpcomingEvent/>

      <Contact></Contact>
    </main>
  )
}