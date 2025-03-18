import Link from "next/link"; 

export default function Logo(){
    return (
        <div className="flex flex-1 items-center h-full ml-[5%]">
            <Link
                href="/"
                className="flex items-center space-x-2 text-black duration-150 ease-in-out hover:text-[#7A4E9A]"
            >
                <img
                    src={"/images/logo/Logo1.png"}
                    className="filter invert w-[75px] h-[75px]"
                    alt="logo Icon"
                ></img>
                <span className="text-[28px] font-bold hidden md:flex">
                    StepOut
                </span>
            </Link>
        </div>
    )
}