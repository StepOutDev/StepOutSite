import Banner from "@/components/bannerComponents/banner";
import Contact from "@/components/contactComponents/contact";

export default function Home() {
  return (
    <main className="absolute inset-0 z-10 w-full"> 
      <Banner></Banner>

      <div className="mt-[5%] ml-[10%]  text-[#422A40] text-[32px] font-bold text-poppins ">
        Upcoming Event
      </div>

      <Contact></Contact>
    </main>
  )
}