import Link from "next/link"

export default function Topmenu () {
    // const session = await getServerSession(authOptions);
    
    return(
        <nav className="h-[75px] grid grid-cols-5 backdrop-blur-lg  bg-slate-100/70 fixed top-0 left-0 right-0 z-30 border-gray-200 shadow-lg px-5">
            <div className="flex flex-1 items-center h-full ml-[10%] ">
                <Link
                href="/"
                className="flex items-center space-x-2 text-black duration-300 ease-in-out hover:text-[#7A4E9A]"
                >
                <img
                    src={"/images/logo/Logo1.png"}
                    className="filter invert w-[75px] h-[75px] rounded-xl"
                    alt="logo Icon"
                ></img>
                <span className="self-center text-[28px] font-poppins font-bold whitespace-nowrap">
                    StepOut
                </span>
                </Link>
            </div>

            

        </nav>
    )
}